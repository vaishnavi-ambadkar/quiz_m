import { useState, useCallback, useEffect } from "react";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";


export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("https://quiz-m-api.vercel.app/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === questions.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (loading) {
    return <p className="text-center">Loading questions...</p>;
  }

  // if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} questions={questions} />;
  }

  return (
    <div>
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        question={questions[activeQuestionIndex]}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}

       

