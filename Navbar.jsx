import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Brand</div>
      <ul className="navbar-nav">
        <li className="nav-item"><Link to="/translator">Translator</Link></li>
        <li className="nav-item"><Link to="/image-to-text">Image to Text</Link></li>
        <li className="nav-item"><a href="#">Contact</a></li>
      </ul>
      <div className="navbar-settings">
        <span className="mode-text">{isDarkMode ? 'Bright Mode' : 'Dark Mode'}</span>
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
