import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SpokeIcon from '@mui/icons-material/Spoke';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  // State to track the active link
  const [activeLink, setActiveLink] = useState('/');  // Default active link is "/"

  // Function to handle link click and update active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link
            to="/"
            onClick={() => handleLinkClick('/')}
            className={activeLink === '/' ? 'active' : ''}
          >
            <SpaceDashboardSharpIcon style={{ fontSize: 45 }} />
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            onClick={() => handleLinkClick('/about')}
            className={activeLink === '/about' ? 'active' : ''}
          >
            <SpokeIcon style={{ fontSize: 45 }} />
          </Link>
        </li>
        <li>
          <Link
            to="/player"
            onClick={() => handleLinkClick('/player')}
            className={activeLink === '/player' ? 'active' : ''}
          >
            <LibraryMusicIcon style={{ fontSize: 45 }} />
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            onClick={() => handleLinkClick('/settings')}
            className={activeLink === '/settings' ? 'active' : ''}
          >
            <SettingsIcon style={{ fontSize: 45 }} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
