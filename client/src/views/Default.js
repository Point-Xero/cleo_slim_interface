import React from 'react';
import axios from 'axios';

function Default() {
    // Function to handle the reboot
    const handleReboot = () => {
        // Ask for user confirmation
        const confirmReboot = window.confirm("Are you sure you want to reboot the Raspberry Pi?");
        
        // If the user confirms, proceed with the reboot
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

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Default Screen</h1>
            <button 
                onClick={handleReboot} 
                style={{ fontSize: '20px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Reboot Now
            </button>
        </div>
    );
}

export default Default;
