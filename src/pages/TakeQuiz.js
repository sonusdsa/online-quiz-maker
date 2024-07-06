import React, { useState } from "react";
import QuizList from "../components/QuizList";
import QuizResult from "../components/QuizResult";
import "./TakeQuiz.css";

const TakeQuiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);

  const [quizzes, setQuizzes] = useState(
    JSON.parse(localStorage.getItem("quizzes")) || []
  );

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setUserAnswers(new Array(quiz.questions.length).fill(null));
    setScore(null);
  };

  const handleAnswer = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    const correctAnswers = selectedQuiz.questions.filter(
      (q, index) => q.correctAnswer === userAnswers[index]
    ).length;
    setScore(correctAnswers);
  };

  const handleDeleteQuiz = (quizId) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== quizId);
    setQuizzes(updatedQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers(new Array(selectedQuiz.questions.length).fill(null));
    setScore(null);
  };

  return (
    <div className="take-quiz">
      <h2>Take Quiz</h2>
      {selectedQuiz ? (
        <div className="quiz-container">
          <h3>{selectedQuiz.questions[currentQuestion].question}</h3>
          {selectedQuiz.questions[currentQuestion].options.map(
            (option, index) => (
              <button
                key={index}
                className={
                  userAnswers[currentQuestion] === option ? "selected" : ""
                }
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            )
          )}
          <div className="navigation-buttons">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Back
            </button>
            <button onClick={handleNextQuestion}>
              {currentQuestion < selectedQuiz.questions.length - 1
                ? "Save & Next"
                : "Submit"}
            </button>
          </div>
        </div>
      ) : (
        <QuizList
          quizzes={quizzes}
          onQuizSelect={handleQuizSelect}
          onDeleteQuiz={handleDeleteQuiz}
        />
      )}
      {score !== null && (
        <QuizResult
          score={score}
          totalQuestions={selectedQuiz.questions.length}
          onRetakeQuiz={handleRetakeQuiz}
        />
      )}
    </div>
  );
};

export default TakeQuiz;
