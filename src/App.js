// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import "./styles.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/take-quiz" element={<TakeQuiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
