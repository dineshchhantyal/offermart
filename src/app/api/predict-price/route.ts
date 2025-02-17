import { NextResponse } from "next/server";
import OpenAI from "openai";

interface AIResponse {
  percentage: number;
  reasoning: string;
  condition_factor: string;
  expiry_factor: string;
  market_factor: string;
}

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { originalPrice } = body;
    const todayDate = new Date();

    const analysis = await openai.chat.completions.create({
      model: "deepseek-chat",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `You are a product pricing expert. Analyze the product details and suggest a fair price.
          Today's date: ${todayDate.toISOString()}

          Response format:
          {
            "percentage": number,
            "reasoning": string,
            "condition_factor": string,
            "expiry_factor": string,
            "market_factor": string
          }

          Rules:
          1. Return ONLY the JSON object
          2. percentage must be between 40 and 60
          3. Better condition items get higher percentage
          4. Items near expiry get lower percentage
          5. Consider market demand and brand value`,
        },
        {
          role: "user",
          content: `Analyze this product: ${JSON.stringify(body)}`,
        },
      ],
    });
    let aiResponse: AIResponse | null = null;

    // Handle API response with proper error checking
    if (!analysis.choices || analysis.choices.length === 0) {
      throw new Error("No response from AI service");
    }

    for (const choice of analysis.choices) {
      try {
        const content = choice.message?.content?.trim() ?? "";
        // Remove any markdown formatting if present
        const jsonContent = content.replace(/```json\n?|\n?```/g, "").trim();
        const parsed = JSON.parse(jsonContent);

        // Validate response structure
        if (
          parsed &&
          typeof parsed.percentage === "number" &&
          parsed.percentage >= 40 &&
          parsed.percentage <= 60
        ) {
          aiResponse = parsed;
          break;
        }
      } catch (parseError) {
        console.error("Failed to parse choice:", parseError);
        continue;
      }
    }

    if (!aiResponse) {
      throw new Error("Could not get valid response from any choices");
    }

    const suggestedPercentage = aiResponse.percentage / 100;
    const sellerPrice =
      Math.round(originalPrice * suggestedPercentage * 100) / 100;
    const marketPrice = Math.round(originalPrice * 0.7 * 100) / 100;

    return NextResponse.json({
      sellerPrice,
      marketPrice,
      analysis: {
        percentage: aiResponse.percentage,
        reasoning: aiResponse.reasoning,
        factors: {
          condition: aiResponse.condition_factor,
          expiry: aiResponse.expiry_factor,
          market: aiResponse.market_factor,
        },
      },
    });
  } catch (error) {
    console.error("Price prediction error:", error);

    // More detailed error response
    return NextResponse.json(
      {
        error: "Failed to calculate price",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
