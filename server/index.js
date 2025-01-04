const express = require('express');
const { exec } = require('child_process');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');
const cron = require('node-cron');
const moment = require('moment-timezone');

const app = express();
const PORT = process.env.PORT || 5002;
app.use(cors());

// Function to check for updates
const checkForUpdates = async () => {
    try {
        const REPO_OWNER = 'point-xero';
        const REPO_NAME = 'cleo_slim_interface';

        // Fetch the latest version number from GitHub's version.txt file
        const response = await axios.get(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/version.txt`);
        const latestVersion = response.data.trim();

        // Read the local version number from the local version.txt file
        const localVersionPath = path.join(__dirname, '../version.txt'); // Make sure this path is correct
        const localVersion = fs.readFileSync(localVersionPath, 'utf8').trim();

        // Determine if there are updates by comparing version numbers
        const hasUpdates = localVersion !== latestVersion;

        console.log(`Checked for updates: ${hasUpdates ? 'Update available' : 'Up to date'}`);
    } catch (error) {
        console.error('Error checking for updates:', error);
    }
};

// Schedule the version check to run every day at midnight in your preferred timezone
cron.schedule('0 0 * * *', () => {
    console.log('Running scheduled update check at midnight...');
    checkForUpdates();
}, {
    timezone: "Europe/Nicosia"
});

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

// Endpoint to check for updates with detailed version information
app.get('/api/check-updates', async (req, res) => {
    try {
        const REPO_OWNER = 'point-xero';
        const REPO_NAME = 'cleo_slim_interface';

        // Fetch the latest version number from GitHub's version.txt file
        const response = await axios.get(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/version.txt`);
        const latestVersion = response.data.trim();

        // Read the local version number from the local version.txt file
        const localVersionPath = path.join(__dirname, '../version.txt'); // Make sure this path is correct
        const localVersion = fs.readFileSync(localVersionPath, 'utf8').trim();

        // Determine if there are updates by comparing version numbers
        const hasUpdates = localVersion !== latestVersion;

        // Respond with detailed update info
        res.json({
            hasUpdates,
            latestVersion,
            currentVersion: localVersion,
            lastUpdateDate: new Date().toISOString(), // Optional: You could add actual update date if needed
            updateDescription: hasUpdates ? 'New features and improvements are available' : 'You are on the latest version'
        });
    } catch (error) {
        console.error('Error checking for updates:', error);
        res.status(500).json({ error: 'Failed to check for updates' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // Initial check on startup
    checkForUpdates();
});
