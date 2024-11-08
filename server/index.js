const express = require('express');
const { exec } = require('child_process');
const axios = require('axios');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 5002;
app.use(cors());

// Conditionally require 'onoff' and set up GPIO only if on Linux
// let Gpio, button;
// if (os.platform() === 'linux') {
//     Gpio = require('onoff').Gpio;
//     button = new Gpio(18, 'in', 'both'); // Example GPIO setup for Linux
// } else {
//     console.warn('GPIO is only supported on Linux. Skipping GPIO setup.');
// }

// Endpoint to reboot the system
app.get('/reboot', (req, res) => {
    exec('sudo reboot', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send('Error rebooting system');
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.status(500).send('Error rebooting system');
            return;
        }
        res.send('Rebooting...');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// if (button) {
//     // Set up WebSocket and GPIO logic here
//     button.watch((err, value) => {
//         if (err) {
//             console.error('Error with GPIO:', err);
//             return;
//         }
//         console.log(`Button pressed! Value: ${value}`);
//     });
// }

// // Clean up GPIO on exit if GPIO was initialized
// process.on('SIGINT', () => {
//     if (button) button.unexport();
//     console.log('Exiting and releasing GPIO');
//     process.exit();
// });
