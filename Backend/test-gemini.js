require('dotenv').config();

console.log("KEY VALUE:", JSON.stringify(process.env.GOOGLE_GENAI_API_KEY));
console.log("KEY LENGTH:", process.env.GOOGLE_GENAI_API_KEY?.length);
console.log("GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS);

const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function test() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Say hello in one word."
    });
    console.log("SUCCESS:", response.text);
}

test().catch(err => console.error("FAILED:", err));