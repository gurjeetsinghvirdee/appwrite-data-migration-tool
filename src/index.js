const ora = require('ora');
const { migrateFromSQL } = require('../lib/sql');
const { migrateFromNoSQL } = require('../lib/nosql');
const { migrateFromCSV } = require('../lib/csv');

async function main() {
    const spinner = ora('Starting migration').start();

    try {
        await migrateFromSQL();
        await migrateFromNoSQL();
        await migrateFromCSV();
        spinner.succeed('Migration completed successfully');
    } catch (error) {
        spinner.fail('Migration failed');
        console.error(error);
    }
}

main();