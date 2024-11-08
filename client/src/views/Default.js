import React, { useEffect, useState } from 'react';

function Default() {
    // const [buttonPressed, setButtonPressed] = useState(false);

    // useEffect(() => {
    //     // Connect to the WebSocket server
    //     const ws = new WebSocket('ws://localhost:5002');

    //     ws.onopen = () => {
    //         console.log('Connected to WebSocket server');
    //     };

    //     ws.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         // Check if the message contains button state
    //         if (data.buttonPressed !== undefined) {
    //             setButtonPressed(data.buttonPressed === 1);
    //         }
    //     };

    //     ws.onclose = () => {
    //         console.log('Disconnected from WebSocket server');
    //     };

    //     // Cleanup WebSocket connection on component unmount
    //     return () => ws.close();
    // }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Default Screen</h1>
            {/* <p>The button is {buttonPressed ? 'pressed' : 'not pressed'}</p> */}
        </div>
    );
}

export default Default;
