const { Pool } = require('pg');

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(() => console.log("✅ Database connected successfully"))
    .catch(err => console.log("❌ Database connection failed:", err));

module.exports = pool;