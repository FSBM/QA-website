import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Question Schema
const questionSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const Question = mongoose.model("Question", questionSchema);

// Get Questions from Gemini API
app.post("/api/get-questions", async (req, res) => {
  try {
    const { topic } = req.body;
    const apiKey = process.env.GOOGLE_API_KEY;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: `Generate 5 questions about ${topic} in plain text format, each separated by a new line`
          }]
        }]
      }
    );

    const content = response.data.candidates[0].content.parts[0].text;
    res.json({ questions: content });
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

// Submit and Evaluate Answer
app.post("/api/submit-answer", async (req, res) => {
  try {
    const { topicQ, answer } = req.body;
    const apiKey = process.env.GOOGLE_API_KEY;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: `Evaluate this answer: ${answer} to question: ${topicQ}. Provide correct answer and score out of 100`
          }]
        }]
      }
    );

    const result = response.data.candidates[0].content.parts[0].text;
    
    // Store in DB (without user association)
    const newQA = new Question({ question: topicQ, answer: result });
    await newQA.save();

    res.json({ correctedAnswer: result });
  } catch (error) {
    console.error("❌ Error processing answer:", error);
    res.status(500).json({ error: "Failed to evaluate answer" });
  }
});

// Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));