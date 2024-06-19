const { MongoClient } = require('mongodb');
const url =process.env.DB_HOST;
const client = new MongoClient(url);
const dbName = 'search_component';

async function fruitsDb() {
    let db;
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB server');
        db = client.db(dbName);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err; 
    }
    return db.collection('fruits');
}

module.exports = fruitsDb;