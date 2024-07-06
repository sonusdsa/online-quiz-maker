import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizResult.css";

const QuizResult = ({ score, totalQuestions, onRetakeQuiz }) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="quiz-result">
      <h3>
        Your Score: {score} / {totalQuestions}
      </h3>
      <div className="result-buttons">
        <button onClick={onRetakeQuiz} className="retake-button">
          Retake Quiz
        </button>
        <button onClick={handleBackToHome} className="home-button">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
