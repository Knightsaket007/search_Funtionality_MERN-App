const express = require('express');
const app = express.Router();
const fruitsDb = require('../connection/dbConnection')

app.get('/getfruits', async (req, res) => {
    try {
        const db = await fruitsDb();
        const fruits = await db.find({}).toArray();
        res.json(fruits);
    } catch (err) {
        console.error('Error fetching data from MongoDB:', err);
        res.status(500).send('Internal Server Error');
    }

});

module.exports = app;
