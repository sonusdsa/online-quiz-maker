// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Quiz Maker
      </Link>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`} onClick={closeMenu}>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/create-quiz"
            className={location.pathname === "/create-quiz" ? "active" : ""}
          >
            Create Quiz
          </Link>
        </li>
        <li>
          <Link
            to="/take-quiz"
            className={location.pathname === "/take-quiz" ? "active" : ""}
          >
            Take Quiz
          </Link>
        </li>
      </ul>
      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;
