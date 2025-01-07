import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ThemeContext } from '../ThemeContext';
import { Grid } from '@mui/material';

function Settings() {
  const { themeMode, setThemeMode } = useContext(ThemeContext);

  const [updateInfo, setUpdateInfo] = useState({
    hasUpdate: false,
    latestVersion: '',
    currentVersion: '',
    lastUpdateDate: '',
    updateDescription: '',
  });

  const [message, setMessage] = useState('');
  const [hasFetched, setHasFetched] = useState(false);

  const handleThemeChange = (mode) => {
    setThemeMode(mode);
  };

  const handleReboot = () => {
    const confirmReboot = window.confirm('Are you sure you want to reboot the Raspberry Pi?');
    if (confirmReboot) {
      axios
        .get('http://localhost:5002/reboot')
        .then((response) => alert(response.data))
        .catch((error) => {
          alert('Failed to reboot the system.');
          console.error('Error:', error);
        });
    } else {
      alert('Reboot canceled.');
    }
  };

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/check-updates');
        const { hasUpdates, latestVersion, currentVersion, lastUpdateDate, updateDescription } = response.data;

        setUpdateInfo({
          hasUpdate: hasUpdates,
          latestVersion,
          currentVersion,
          lastUpdateDate,
          updateDescription,
        });

        setMessage(
          hasUpdates
            ? `An update is required: Latest Version - ${latestVersion}`
            : 'No Updates required - you are on the current version'
        );

        setHasFetched(true);
      } catch (error) {
        console.error('Error fetching update status:', error);
        setMessage('Error checking for updates');
      }
    };

    if (!hasFetched) {
      checkForUpdates();
    }
  }, [hasFetched]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ marginTop: '20px' }}>
        <h2>Theme Settings</h2>
        <div>
          <button
            onClick={() => handleThemeChange('alwaysLight')}
            style={{
              padding: '10px 20px',
              margin: '5px',
              backgroundColor: themeMode === 'alwaysLight' ? '#007BFF' : '#E0E0E0',
              color: themeMode === 'alwaysLight' ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Always Light
          </button>
          <button
            onClick={() => handleThemeChange('alwaysDark')}
            style={{
              padding: '10px 20px',
              margin: '5px',
              backgroundColor: themeMode === 'alwaysDark' ? '#007BFF' : '#E0E0E0',
              color: themeMode === 'alwaysDark' ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Always Dark
          </button>
          <button
            onClick={() => handleThemeChange('dynamic')}
            style={{
              padding: '10px 20px',
              margin: '5px',
              backgroundColor: themeMode === 'dynamic' ? '#007BFF' : '#E0E0E0',
              color: themeMode === 'dynamic' ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Dynamic (Day/Night)
          </button>
        </div>
      </div>

     
    </div>
      </Grid>
      <Grid item xs={6}>
        <h1>Device Version</h1>
      <div className='versioning' style={{ marginBottom: '20px', color: updateInfo.hasUpdate ? 'green' : 'black' }}>
        <p>{message}</p>
        <p>
          <strong>Current Version:</strong> {updateInfo.currentVersion}
        </p>
        <p>
          <strong>Latest Version:</strong> {updateInfo.latestVersion}
        </p>
        <p>
          <strong>Last Update Date:</strong> {updateInfo.lastUpdateDate
            ? new Date(updateInfo.lastUpdateDate).toLocaleString()
            : 'N/A'}
        </p>
        <p>
          <strong>Update Description:</strong> {updateInfo.updateDescription || 'No description available.'}
        </p>
      </div>

       <button
        onClick={handleReboot}
        style={{
          fontSize: '20px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Reboot Now
      </button>
      </Grid>
    </Grid>
  );
}

export default Settings;
