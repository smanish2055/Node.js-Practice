const { Pool } = require('pg');

// Replace these connection details with your own
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ManishDay_1',
    password: '12345',
    port: 5432, // Default PostgreSQL port is 5432
});

// Test the connection
pool.query('SELECT * from orders', (err, res) => {
    if (err) {
        console.error('Error connecting to PostgreSQL database:', err);
    } else {
        console.log('Connected to PostgreSQL database');
        console.log('Current timestamp from the database:', res.rows[4]);
    }
    pool.end(); // Close the connection pool
});
