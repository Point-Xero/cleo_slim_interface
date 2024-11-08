import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Settings() {
    const [hasUpdate, setHasUpdate] = useState(false);

    // Function to handle the reboot
    const handleReboot = () => {
        const confirmReboot = window.confirm("Are you sure you want to reboot the Raspberry Pi?");
        
        if (confirmReboot) {
            axios.get('http://localhost:5002/reboot')
                .then(response => {
                    alert(response.data); // Show success message from server
                })
                .catch(error => {
                    alert('Failed to reboot the system.');
                    console.error('Error:', error);
                });
        } else {
            alert("Reboot canceled.");
        }
    };

    // Check for updates when the component mounts
    useEffect(() => {
        const checkForUpdates = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/check-updates');
                setHasUpdate(response.data.hasUpdates);
            } catch (error) {
                console.error('Error fetching update status:', error);
            }
        };

        checkForUpdates();
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Default Screen</h1>
            {hasUpdate && (
                <div style={{ marginBottom: '20px', color: 'green' }}>
                    A new update is available! Please refresh the page or restart the app to see the latest version.
                </div>
            )}
            <button 
                onClick={handleReboot} 
                style={{ fontSize: '20px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Reboot Now
            </button>
        </div>
    );
}

export default Settings;
