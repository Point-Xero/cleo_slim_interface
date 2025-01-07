// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Controller from './views/Controller';
import Default from './views/Default';
import MusicPlayer from './views/MusicPlayer';
import Settings from './views/Settings';
import Screensaver from './components/Screensaver';
import GuestRoom from './sub-views/GuestRoom';
import Bathroom from './sub-views/Bathroom';
import Outdoor from './sub-views/Outdoor';
import Alarm from './sub-views/Alarm';
import { Navigate } from 'react-router-dom';

const App = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  let timeout;

  // Reset the inactivity timer
  const resetTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setShowOverlay(true), 30000); // 30 seconds
  };

  useEffect(() => {
    // Set up event listeners for user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    // Set the initial timer
    resetTimer();

    // Clean up the event listeners and timer
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, []);

  return (
    <>
      {showOverlay && <Screensaver onClick={() => setShowOverlay(false)} />}
      <Router>
        <div className="primary-container">
          <div className="navigation">
            <Navbar />
          </div>
          <div className="outlet">
            <Routes>
              <Route path="/" element={<Default />}>
                <Route index element={<Navigate to="guestroom" replace />} />
                <Route path="guestroom" element={<GuestRoom />} />
                <Route path="bathroom" element={<Bathroom />} />
                <Route path="outdoor" element={<Outdoor />} />
                <Route path="alarm" element={<Alarm />} />
              </Route>
              <Route path="/about" element={<Controller />} />
              <Route path="/player" element={<MusicPlayer />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
