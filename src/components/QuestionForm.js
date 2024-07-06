import React, { useState, useEffect } from "react";
import "./QuestionForm.css";

const QuestionForm = ({ addQuestion, initialQuestion }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1); // Initialize question number

  useEffect(() => {
    if (initialQuestion) {
      setQuestion(initialQuestion.question);
      setOptions(initialQuestion.options);
      setCorrectAnswer(initialQuestion.correctAnswer);
    } else {
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    }
  }, [initialQuestion]);

  const handleQuestionChange = (e) => {
    const input = e.target.value;
    const numberedQuestion = `Q${questionNumber}: ${input}`;
    setQuestion(numberedQuestion);
  };

  const handleOptionChange = (e, index) => {
    const input = e.target.value;
    const alphabeticOption = `${String.fromCharCode(65 + index)}: ${input}`;
    setOptions([
      ...options.slice(0, index),
      alphabeticOption,
      ...options.slice(index + 1),
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuestion({ question, options, correctAnswer });
    setQuestionNumber(questionNumber + 1); // Increment question number
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <div className="form-group">
        <h1>Create or Edit Quiz</h1>
        <label>Question</label>
        <input
          type="text"
          value={question.replace(/^Q\d+: /, "")} // Remove question number prefix for input
          onChange={handleQuestionChange}
          placeholder="Enter your question"
        />
      </div>
      {options.map((option, index) => (
        <div key={index} className="form-group">
          <label>Option {String.fromCharCode(65 + index)}</label>
          <input
            type="text"
            value={option.replace(/^[A-D]: /, "")} // Remove option prefix for input
            onChange={(e) => handleOptionChange(e, index)}
            placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
          />
        </div>
      ))}
      <div className="form-group">
        <label>Correct Answer</label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          placeholder="Enter the correct answer"
        />
      </div>
      <button type="submit">Save Question</button>
    </form>
  );
};

export default QuestionForm;
