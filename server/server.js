import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://quiz-m-frontend-git-main-vaishnavi-ambadkars-projects.vercel.app", // Your frontend URL
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const questionSchema = new mongoose.Schema({
  id: String,
  text: String,
  answers: [String],
  correct: String,
});

const Question = mongoose.model("Question", questionSchema);

// Function to insert questions
const insertQuestions = async () => {
  const questions = [
    { id: "q1", text: "What comes next in the sequence: 1, 4, 9, 16, __?", answers: ["20", "25", "30"], correct: "25" },
    { id: "q2", text: "A clock shows 3:15. What is the angle between the hour and minute hands?", answers: ["30°", "7.5°", "12°"], correct: "7.5°" },
    { id: "q3", text: "If a rooster lays an egg on top of a roof, which way does it roll?", answers: ["Left", "It doesn't", "Down"], correct: "It doesn't" },
    { id: "q4", text: "What has one eye but cannot see?", answers: ["Storm", "Needle", "Hurricane"], correct: "Needle" },
    { id: "q5", text: "What is the next prime number after 11?", answers: ["12", "13", "17"], correct: "13" },
    { id: "q6", text: "Which number completes the pattern? 8, 27, 64, __, 216", answers: ["100", "125", "144"], correct: "125" },
    { id: "q7", text: "A bat and a ball cost $1.10 together. The bat costs $1.00 more than the ball. How much does the ball cost?", answers: ["10 cents", "5 cents", "1 cent"], correct: "5 cents" },
    { id: "q8", text: "What is always coming but never arrives?", answers: ["Future", "Tomorrow", "Sunrise"], correct: "Tomorrow" },
    { id: "q9", text: "Which letter is next in the sequence: J, F, M, A, M, __?", answers: ["J", "F", "S"], correct: "J" },
    { id: "q10", text: "I have branches, but no trunk or leaves. What am I?", answers: ["Road", "Bank", "River"], correct: "Bank" },
  ];

  await Question.deleteMany({});
  await Question.insertMany(questions);
  console.log("Questions inserted successfully!");
};

// Run this ONCE and then comment it out
insertQuestions();

app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});
app.get("/",(req,res)=>{
    res.json("Hi");
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
