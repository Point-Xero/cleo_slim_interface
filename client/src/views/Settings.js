import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Settings() {
    const [updateInfo, setUpdateInfo] = useState({
        hasUpdate: false,
        latestVersion: '',
        currentVersion: '',
        lastUpdateDate: '',
        updateDescription: ''
    });
    const [message, setMessage] = useState('');
    const [hasFetched, setHasFetched] = useState(false); // Track if data has been fetched

    // State for theme settings
    const [themeMode, setThemeMode] = useState('alwaysLight'); // Default to "Always Light"

    const handleReboot = () => {
        const confirmReboot = window.confirm("Are you sure you want to reboot the Raspberry Pi?");
        
        if (confirmReboot) {
            axios.get('http://localhost:5002/reboot')
                .then(response => {
                    alert(response.data);
                })
                .catch(error => {
                    alert('Failed to reboot the system.');
                    console.error('Error:', error);
                });
        } else {
            alert("Reboot canceled.");
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
                    updateDescription
                });

                setMessage(
                    hasUpdates
                        ? `An update is required: Latest Version - ${latestVersion}`
                        : 'No Updates required - you are on the current version'
                );
                setHasFetched(true); // Mark that we've fetched data
            } catch (error) {
                console.error('Error fetching update status:', error);
                setMessage('Error checking for updates');
            }
        };

        if (!hasFetched) {
            checkForUpdates(); // Only fetch if we haven't already fetched data
        }
    }, [hasFetched]);

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('themeMode', theme);
    };

    const determineDynamicTheme = () => {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18 ? 'light' : 'dark';
    };

    // Function to handle theme mode changes
    const handleThemeChange = (mode) => {
        setThemeMode(mode);

        if (mode === 'dynamic') {
            const dynamicTheme = determineDynamicTheme();
            applyTheme(dynamicTheme);

            // Save mode as "dynamic" in localStorage for future sessions
            localStorage.setItem('themeMode', 'dynamic');
        } else {
            const theme = mode === 'alwaysLight' ? 'light' : 'dark';
            applyTheme(theme);
        }
    };

    useEffect(() => {
        // Load saved theme from localStorage if available
        const savedTheme = localStorage.getItem('themeMode') || 'light';
        setThemeMode(savedTheme === 'light' ? 'alwaysLight' : savedTheme === 'dark' ? 'alwaysDark' : 'dynamic');
        
        if (savedTheme === 'dynamic') {
            applyTheme(determineDynamicTheme());
        } else {
            applyTheme(savedTheme);
        }

        // If in dynamic mode, check the theme every hour
        if (savedTheme === 'dynamic') {
            const intervalId = setInterval(() => {
                applyTheme(determineDynamicTheme());
            }, 3600000); // Check every hour

            return () => clearInterval(intervalId); // Clear interval on unmount
        }
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Settings</h1>
            <div style={{ marginBottom: '20px', color: updateInfo.hasUpdate ? 'green' : 'black' }}>
                <p>{message}</p>
                <p><strong>Current Version:</strong> {updateInfo.currentVersion}</p>
                <p><strong>Latest Version:</strong> {updateInfo.latestVersion}</p>
                <p><strong>Last Update Date:</strong> {new Date(updateInfo.lastUpdateDate).toLocaleString()}</p>
                <p><strong>Update Description:</strong> {updateInfo.updateDescription}</p>
            </div>

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
                            cursor: 'pointer'
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
                            cursor: 'pointer'
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
                            cursor: 'pointer'
                        }}
                    >
                        Dynamic (Day/Night)
                    </button>
                </div>
            </div>

            <button 
                onClick={handleReboot} 
                style={{ fontSize: '20px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
            >
                Reboot Now
            </button>
        </div>
    );
}

export default Settings;
