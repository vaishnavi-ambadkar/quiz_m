import diamondTrophy from "../assets/diamond-trophy.png";
import goldTrophy from "../assets/gold-trophy.png";
import bronzeTrophy from "../assets/bronze-trophy.png";

export default function Summary({ userAnswers, questions }) {
  const score = userAnswers.reduce((acc, answer, index) => {
    return answer === questions[index].correct ? acc + 1 : acc;
  }, 0);

  let trophyImage;
  if (score === questions.length) {
    trophyImage = diamondTrophy;
  } else if (score >= questions.length / 2) {
    trophyImage = goldTrophy;
  } else {
    trophyImage = bronzeTrophy;
  }

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Summary</h2>
      <img src={trophyImage} alt="Trophy" className="w-32 mx-auto mb-4" />
      <p className="text-lg font-semibold">
        Your Score: {score} / {questions.length}
      </p>
      <ul className="mt-4 text-left">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === question.correct;

          return (
            <li key={question._id} className={`p-3 mb-2 rounded-md ${isCorrect ? "bg-green-300" : "bg-red-300"}`}>
              <p className="font-semibold">{question.text}</p>
              <p><strong>Your Answer:</strong> {userAnswer ? userAnswer : "Skipped"}</p>
              {!isCorrect && <p><strong>Correct Answer:</strong> {question.correct}</p>}
            </li>
          );
        })}
      </ul>
      <button onClick={() => window.location.reload()} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full">
        Restart Quiz
      </button>
    </div>
  );
}
