// src/components/QuizCard.js
import React from "react";
import "./QuizCard.css";

const QuizCard = ({ quiz, onQuizSelect, onDeleteQuiz }) => {
  return (
    <div className="quiz-card">
      <h3>Quiz {quiz.id}</h3>
      <p>Number of Questions: {quiz.questions.length}</p>
      <div className="quiz-card-actions">
        <button onClick={() => onQuizSelect(quiz)}>Take Quiz</button>
        <button onClick={() => onDeleteQuiz(quiz.id)} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
