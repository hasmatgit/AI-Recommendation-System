// src/services/aiService.js

import { GoogleGenAI } from "@google/genai";
import { products } from "../data/products";

// Initialize Gemini with the new API Key from .env
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const getRecommendations = async (userQuery) => {
  try {
    // Product list ko AI ke liye tayyar karna
    const productSummary = products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      desc: p.description
    }));

    // Prompt jo AI se sirf JSON IDs return karne ko kahega
    const prompt = `
      You are an intelligent shopping assistant.
      The user wants: "${userQuery}".
      Available Products: ${JSON.stringify(productSummary)}
      
      Task: Based on the user's request, select the products that best match and return a JSON object containing an array of their IDs.
      
      IMPORTANT: Only return the JSON object. Do not include any explanations or extra text.
      Format: { "ids": [1, 4, ...] }
    `;

    // Gemini API call, forcing JSON output
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json", 
        responseSchema: {
          type: "object",
          properties: {
            ids: {
              type: "array",
              items: { type: "number" },
              description: "An array of matching product IDs."
            }
          },
          required: ["ids"]
        }
      }
    });

    const responseText = response.text.trim();
    const parsedData = JSON.parse(responseText);

    return parsedData.ids || [];
    
  } catch (error) {
    console.error("Gemini AI Service Error:", error);
    // Error handling: Khali array return karo
    return []; 
  }
};