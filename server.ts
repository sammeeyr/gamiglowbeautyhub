import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Gemini AI Shade Matcher & Beauty Advisor Endpoint
app.post("/api/gemini/advisor", async (req, res) => {
  try {
    const { skinTone, undertone, skinType, desiredLook } = req.body;

    const prompt = `You are the lead beauty advisor at Yanga Luxe Beauty, a high-end luxury African cosmetics brand. 
A client is asking for personalized makeup recommendations with the following profile:
- Skin Tone / Shade Depth: ${skinTone || "Medium Rich"}
- Undertone: ${undertone || "Warm / Golden"}
- Skin Type: ${skinType || "Combination"}
- Desired Look / Occasion: ${desiredLook || "Flawless Everyday Glam"}

Provide a sophisticated, luxurious recommendation response in JSON format matching this schema:
{
  "foundationShade": "string (e.g. Yanga Glow Silk Fluid in Amber 450)",
  "recommendedProducts": [
    { "name": "string", "category": "string", "why": "string" }
  ],
  "beautyRoutineTips": [
    "string"
  ],
  "whatsappPresetMessage": "string"
}
Return strictly valid JSON without markdown code fences.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an expert luxury makeup artist and beauty advisor specializing in rich skin tones and high-end glamour.",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    res.json(data);
  } catch (error: any) {
    console.error("Gemini advisor error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI advice." });
  }
});

// Mock checkout endpoint
app.post("/api/checkout", (req, res) => {
  const { cart, customer, paymentMethod } = req.body;
  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const orderId = " YL-" + Math.floor(100000 + Math.random() * 900000);
  const totalAmount = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  res.json({
    success: true,
    orderId,
    totalAmount,
    message: "Order placed successfully! Confirmation sent to " + (customer?.email || "customer"),
    estimatedDelivery: "3-5 Business Days (Express Luxury Courier)",
  });
});

if (process.env.NODE_ENV !== "production") {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.resolve(__dirname, "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
