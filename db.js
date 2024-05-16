const { Pool } = require('pg');

require('dotenv').config();



const connectionString = process.env.DB_CONNECTION_STRING;


const pool = new Pool({
    connectionString
  });
  
  (async () => {
    try {
      const client = await pool.connect();
  
      console.log('Connected to PostgreSQL cluster successfully!');
  
  
  
      const createTableQuery = `
      CREATE TABLE IF NOT EXISTS "userdb" (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100)  NOT NULL,
        mob VARCHAR(10)  NOT NULL,
        dob VARCHAR(15) NOT NULL
      );
    `;
  
    // Execute the SQL query
    await client.query(createTableQuery);
  
    
  
      
  
    } catch (error) {
      console.error('Error connecting to database:', error);
    } 
  })();



  

module.exports = pool;