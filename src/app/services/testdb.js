const { connectDB } = require("./db.js");

async function testConnection() {
  try {
    await connectDB();
    console.log("Connected to the database!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

testConnection();
