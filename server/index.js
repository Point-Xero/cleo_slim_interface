const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = 5002;

app.use(cors());

app.get('/api/hello', (req, res) => {
    res.json({msg: 'Testing the server!'});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});