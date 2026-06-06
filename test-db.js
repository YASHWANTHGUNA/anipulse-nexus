// test-db.js
const { Pool } = require('@neondatabase/serverless');

async function test() {
  const connectionString = "postgresql://neondb_owner:npg_tEznC0xWIpU4@ep-holy-brook-apqwtkul.c-7.us-east-1.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require";
  
  try {
    const pool = new Pool({ connectionString });
    const client = await pool.connect();
    console.log("✅ Success! Connection string is valid.");
    client.release();
    pool.end();
  } catch (err) {
    console.error("❌ Connection failed!");
    console.error("Reason:", err.message);
  }
}

test();