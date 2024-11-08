// Overlay.js
import React from 'react';
import './Screensaver.css';

const Screensaver = ({ onClick }) => {
  return (
    <div className="overlay" onClick={onClick}>
      Hello
    </div>
  );
};

export default Screensaver;
