import { useState, useEffect } from "react";
import Answers from "./Answers";

export default function Question({ index, question, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({ selectedAnswer: "", isCorrect: null });

  function handleSelectAnswer(selected) {
    setAnswer({ selectedAnswer: selected, isCorrect: null });

    setTimeout(() => {
      const isCorrect = question.correct === selected;
      setAnswer({ selectedAnswer: selected, isCorrect });

      setTimeout(() => {
        onSelectAnswer(selected);
      }, 2000);
    }, 1000);
  }

  // Automatically skip the question after a set time (if needed)
  useEffect(() => {
    const skipTimer = setTimeout(() => {
      if (!answer.selectedAnswer) {
        onSkipAnswer();
      }
    }, 10000); // Previously handled by QuestionTimer

    return () => clearTimeout(skipTimer);
  }, [answer.selectedAnswer, onSkipAnswer]);

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question" className="rounded-xl p-10 w-3/4 mx-auto text-center border-2 shadow-2xl">
      <h2 className="question-text">{question.text}</h2>
      <Answers answers={question.answers} selectedAnswer={answer.selectedAnswer} answerState={answerState} onSelect={handleSelectAnswer} />
    </div>
  );
}
