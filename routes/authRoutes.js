const express = require("express");
const router = express.Router();
const sql = require("mssql");
const bcrypt = require("bcrypt");

// DB CONFIG
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// helper: get DB connection safely
async function getPool() {
  return await sql.connect(config);
}

// ====================== REGISTER ======================
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await getPool();

    // check if user exists
    const existingUser = await pool.request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM Users WHERE Username = @username");

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    await pool.request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedPassword)
      .input("role", sql.VarChar, "staff")
      .query(`
        INSERT INTO Users (Username, PasswordHash, Role)
        VALUES (@username, @password, @role)
      `);

    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// ====================== LOGIN ======================
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await getPool();

    const result = await pool.request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM Users WHERE Username = @username");

    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.PasswordHash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.UserID,
        username: user.Username,
        role: user.Role,
      },
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;