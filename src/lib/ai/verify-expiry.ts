import OpenAI from "openai";
import sharp from "sharp";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function preprocessImage(imageUrl: string): Promise<string> {
  // Download and process image
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();

  // Optimize image for OCR
  const processed = await sharp(buffer).greyscale().normalize().toBuffer();

  // Convert to base64
  return `data:image/jpeg;base64,${processed.toString("base64")}`;
}

interface ExpiryVerification {
  isExpiryDateShown: boolean;
  isExpiryValid: boolean;
  productDetails: {
    expiryLocation?: string;
    batchNumber?: string;
    manufacturerDate?: string;
    storageInfo?: string;
    additionalInfo?: string;
  };
  confidence: number;
}

export async function verifyExpiryDate(
  imageUrl: string,
  providedDate?: string
): Promise<ExpiryVerification> {
  try {
    // const base64Image = await preprocessImage(imageUrl);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this product image and provide the following information in JSON format:
              1. Is expiry date visible? (true/false)
              2. Does the expiry date match the provided date: ${providedDate}? (true/false)
              3. Where is the expiry date located on the product?
              4. Additional product details like batch number, manufacturing date
              5. Storage information if visible
              6. Confidence level in the analysis (0-1)

              Return JSON only, no other text.
              example:
              {
                "isExpiryDateVisible": true,
                "isExpiryMatch": true,
                "expiryLocation": "Bottom right corner",
                "batchNumber": "12345",
                "manufacturerDate": "2022-01-01",
                "storageInfo": "Store in a cool dry place",
                "additionalDetails": "Contains nuts",
                },
              `,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0]?.message?.content || "{}");

    return {
      isExpiryDateShown: result.isExpiryDateVisible || false,
      isExpiryValid: result.isExpiryMatch || false,
      productDetails: {
        expiryLocation: result.expiryLocation,
        batchNumber: result.batchNumber,
        manufacturerDate: result.manufacturerDate,
        storageInfo: result.storageInfo,
        additionalInfo: result.additionalDetails,
      },
      confidence: result.confidence || 0,
    };
  } catch (error) {
    console.error("[VERIFY_EXPIRY_ERROR]", error);
    return {
      isExpiryDateShown: false,
      isExpiryValid: false,
      productDetails: {},
      confidence: 0,
    };
  }
}

interface Product {
  images: string[];
  expiryDate: string;
}

export async function verifyBulkExpiryDates(
  products: Product[]
): Promise<ExpiryVerification[]> {
  return Promise.all(
    products.map(async (product) => {
      return await verifyExpiryDate(product.images[0], product.expiryDate);
    })
  );
}

interface ImageAnalysis extends ExpiryVerification {
  imageUrl: string;
}

export async function verifyProductImages(
  images: string[],
  providedDate: string
): Promise<{
  isValid: boolean;
  analyses: ImageAnalysis[];
  bestMatch?: ImageAnalysis;
}> {
  try {
    // Analyze all images in parallel
    const analyses = await Promise.all(
      images.map(async (imageUrl) => {
        const verification = await verifyExpiryDate(imageUrl, providedDate);
        return {
          ...verification,
          imageUrl,
        };
      })
    );

    // Find the best match (highest confidence with valid expiry date)
    const validAnalyses = analyses.filter(
      (analysis) => analysis.isExpiryDateShown && analysis.isExpiryValid
    );

    const bestMatch = validAnalyses.reduce(
      (best, current) =>
        current.confidence > (best?.confidence || 0) ? current : best,
      undefined as ImageAnalysis | undefined
    );

    return {
      isValid: validAnalyses.length > 0,
      analyses,
      bestMatch,
    };
  } catch (error) {
    console.error("[VERIFY_PRODUCT_IMAGES_ERROR]", error);
    return {
      isValid: false,
      analyses: [],
    };
  }
}
