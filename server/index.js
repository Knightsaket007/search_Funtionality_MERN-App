const express = require('express');
const app = express();
const port = 5000;
require('dotenv').config();
const search = require('./routes/search'); 
const cors = require('cors'); 

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(cors());

app.use('/search', search);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
