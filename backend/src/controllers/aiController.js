import { GoogleGenerativeAI } from "@google/generative-ai";
import Task from "../models/Task.js";
import User from "../models/User.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateTaskFromAI = async (req, res) => {
  try {
    const { input } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Convert the following instruction into JSON.

Instruction: "${input}"

Return ONLY JSON:
{
  "title": "",
  "assignedTo": "",
  "priority": "low | medium | high",
  "deadline": ""
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    // Clean JSON
    const clean = response.replace(/```json|```/g, "").trim();
    const aiData = JSON.parse(clean);

    // Find user
    const user = await User.findOne({
      name: new RegExp(aiData.assignedTo, "i")
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Create task
    const task = await Task.create({
      title: aiData.title,
      assignedTo: user._id,
      priority: aiData.priority,
      deadline: aiData.deadline,
      createdBy: req.user.id
    });

    res.json({ task });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI processing failed" });
  }
};
