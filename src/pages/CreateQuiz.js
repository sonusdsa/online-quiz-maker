import React, { useState } from "react";
import QuestionForm from "../components/QuestionForm";
import "./CreateQuiz.css";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const addQuestion = (question) => {
    if (editingQuestionIndex !== null) {
      const updatedQuestions = questions.map((q, index) =>
        index === editingQuestionIndex ? question : q
      );
      setQuestions(updatedQuestions);
      setEditingQuestionIndex(null);
    } else {
      setQuestions([...questions, question]);
    }
    setCurrentQuestion(null);
  };

  const editQuestion = (index) => {
    setCurrentQuestion(questions[index]);
    setEditingQuestionIndex(index);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    if (index === editingQuestionIndex) {
      setEditingQuestionIndex(null);
      setCurrentQuestion(null);
    }
  };

  const saveQuiz = () => {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    quizzes.push({ id: Date.now(), questions });
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    alert("Quiz saved!");
    setQuestions([]);
  };

  return (
    <div className="create-quiz">
      <div className="question-form-container">
        <QuestionForm
          addQuestion={addQuestion}
          initialQuestion={currentQuestion}
        />
      </div>
      <button onClick={saveQuiz} className="save-quiz-button">
        Save Quiz
      </button>
      <ul className="question-list">
        {questions.map((q, index) => (
          <li key={index} className="question-item">
            <span>{q.question}</span>
            <button onClick={() => editQuestion(index)} className="edit-button">
              Edit
            </button>
            <button
              onClick={() => deleteQuestion(index)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateQuiz;
