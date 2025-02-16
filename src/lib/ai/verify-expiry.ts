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

export async function verifyExpiryDate(
  imageUrl: string,
  providedDate: string
): Promise<boolean> {
  try {
    const base64Image = await preprocessImage(imageUrl);

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                "Please analyze this image and find the expiry date. Compare it with the provided date and return true only if the dates match or are within 1 day difference. Provided date for comparison: " +
                providedDate,
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
      max_tokens: 100,
    });

    const result = response.choices[0]?.message?.content?.toLowerCase() || "";
    return result.includes("true");
  } catch (error) {
    console.error("[VERIFY_EXPIRY_ERROR]", error);
    return false;
  }
}

interface Product {
  images: string[];
  expiryDate: string;
}

export async function verifyBulkExpiryDates(products: Product[]) {
  return Promise.all(
    products.map(async (product) => {
      return await verifyExpiryDate(product.images[0], product.expiryDate);
    })
  );
}
