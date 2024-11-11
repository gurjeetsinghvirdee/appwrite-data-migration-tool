const { AppwriteException } = require('appwrite');
const mysql = require('mysql');

async function migrateFromSQL() {
    // Create MySQL connection
    const connection = mysql.createConnection({
        host: 'your-sql-host',
        user: 'your-sql-user',
        password: 'your-sql-password',
        database: 'your-sql-database'
    });

    connection.connect();

    // Create Appwrite client
    const client = new appwrite.Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
        .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
        .setKey(process.env.APPWRITE_API_KEY) // Your secret API key

    const databases = new appwrite.Databases(client);

    // Fetch data from SQL
    connection.query('SELECT * FROM your_table', async (error, results, fields) => {
        if (error) throw error;

        // Iterate over the SQL results
        for (const row of results) {
            // Transform the data if needed
            const transformedData = {
                // Map your SQL columns to Appwrite document fields
                field1: row.sql_column1,
                field2: row.sql_column2,
            };

            try {
                // Push data to appwrite
                await databases.createDocument(process.env.APPWRITE_COLLECTION_ID, 'unique', transformedData);
            } catch (err) {
                console.error('Error pushing data to Appwrite:', err);
            }
        }
    });

    connection.end();
}

module.exports = { migrateFromSQL };