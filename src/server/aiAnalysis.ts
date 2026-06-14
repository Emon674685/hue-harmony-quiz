import { createServerFn } from "@tanstack/react-start";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeColorPsychology = createServerFn({ method: "POST" })
  .validator((data: { imageBase64: string, mimeType: string }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY environment variable. Please configure it in your environment.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an expert personal stylist and color psychologist. Analyze the person in this image.
First, identify their gender based on visual appearance.
Then, identify their skin tone and undertone. Then, using seasonal color analysis and color psychology, suggest the best color palette for them.

Please format your response strictly as a JSON object with the following keys:
- "gender": either "male" or "female"
- "skinTone": either "burns", "tans", or "deep" (burns = fair/light, tans = medium/olive, deep = dark/rich)
- "undertone": either "warm", "cool", or "neutral"
- "summary": A brief 2-3 sentence personalized styling advice addressing them (e.g. "You have a beautiful warm olive complexion. Earthy tones and rich jewel colors will make you glow!")

Return ONLY the raw JSON object, without any markdown formatting, backticks, or extra text.
`;

    const imageParts = [
      {
        inlineData: {
          data: data.imageBase64,
          mimeType: data.mimeType
        }
      }
    ];

    try {
      const result = await model.generateContent([prompt, ...imageParts]);
      const responseText = result.response.text().trim();
      
      // Strip potential markdown block
      let cleanJson = responseText;
      if (cleanJson.startsWith("\`\`\`json")) {
        cleanJson = cleanJson.replace(/^\`\`\`json\n/, "").replace(/\n\`\`\`$/, "");
      } else if (cleanJson.startsWith("\`\`\`")) {
        cleanJson = cleanJson.replace(/^\`\`\`\n/, "").replace(/\n\`\`\`$/, "");
      }

      const parsed = JSON.parse(cleanJson);
      return parsed as { gender: "male" | "female", skinTone: "burns" | "tans" | "deep", undertone: "warm" | "cool" | "neutral", summary: string };
    } catch (error: any) {
      console.error("AI Analysis Error:", error);
      throw new Error("Failed to analyze image: " + error.message);
    }
  });
