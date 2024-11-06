import './App.css';
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Controller from './views/Controller';
import Default from './views/Default';
import MusicPlayer from './views/MusicPlayer';
import Settings from './views/Settings';

const App = () => {
  return (
    <Router>
      <div className='primary-container'>
        <div className='navigation'>
          <Navbar />
        </div>
        <div className='outlet'>
          <Routes>
            <Route path="/" element={<Default />} />
            <Route path="/about" element={<Controller />} />
            <Route path="/player" element={<MusicPlayer />} />
            <Route path="/settings" element={<Settings />} />
            {/* Add a parent route if you need an outlet */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Default />} />
              <Route path="about" element={<Controller />} />
              <Route path="player" element={<MusicPlayer />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// Create a layout component to include Outlet
const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
