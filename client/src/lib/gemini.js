import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSummary(content) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Generate a summary of this text within 30 words - ${content}`;

  const result = await model.generateContent(prompt);
  //   console.log(result.response.text());
  return result.response.text();
}
