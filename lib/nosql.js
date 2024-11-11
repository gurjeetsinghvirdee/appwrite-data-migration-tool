const mongodb = require('mongodb');

async function migrateFromNoSQL() {
    const client = new mongodb.MongoClient('your-mongodb-connection-string');
    await client.connect();

    const db = client.db('your-mongodb-database');

    await client.close();
}

module.exports = { migrateFromNoSQL };