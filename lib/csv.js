const fs = require('fs');
const csv = require('csv-parser');

async function migrateFromCSV() {
    const results = [];
    fs.createReadStream('your-csv-file-path')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {

        });
}

module.exports = { migrateFromCSV };