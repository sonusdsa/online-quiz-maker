// src/components/QuizList.js
import React from "react";
import QuizCard from "./QuizCard";
import "./QuizList.css";

const QuizList = ({ quizzes, onQuizSelect, onDeleteQuiz }) => {
  return (
    <div className="quiz-list">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          onQuizSelect={onQuizSelect}
          onDeleteQuiz={onDeleteQuiz}
        />
      ))}
    </div>
  );
};

export default QuizList;
