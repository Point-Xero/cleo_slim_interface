const express = require('express');
const cors = require('cors'); 
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 5002;

app.use(cors());

// Serve static files (the HTML interface with the button)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint that returns a simple message
app.get('/api/hello', (req, res) => {
    res.json({ msg: 'Final Testing of the Server!!!' });
});

// Endpoint to trigger reboot
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
        console.log(`stdout: ${stdout}`);
        res.send('Rebooting...');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
