import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SpokeIcon from '@mui/icons-material/Spoke';
import SettingsIcon from '@mui/icons-material/Settings';


const Navbar = () => {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/"><SpaceDashboardSharpIcon style={{ fontSize: 50 }}/></Link>
          </li>
          <li>
            <Link to="/about"><SpokeIcon style={{ fontSize: 50 }}/></Link>
          </li>
          <li>
            <Link to="/player"><LibraryMusicIcon style={{ fontSize: 50 }}/></Link>
          </li>
          <li>
            <Link to="/settings"><SettingsIcon style={{ fontSize: 50 }}/></Link>
          </li>
        </ul>
      </nav>
    );
  };

export default Navbar
