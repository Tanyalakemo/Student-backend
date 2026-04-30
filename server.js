require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sql = require("mssql");

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- ROUTES ---------------- */
const studentRoutes = require("./routes/studentRoutes");
app.use("/students", studentRoutes);

const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);

/* ---------------- HOME ROUTE ---------------- */
app.get("/", (req, res) => {
    res.send("Backend is running");
});

/* ---------------- DEBUG .env ---------------- */
console.log("USER:", process.env.DB_USER);
console.log("PASSWORD:", process.env.DB_PASSWORD);
console.log("DB:", process.env.DB_NAME);
console.log("SERVER:", process.env.DB_SERVER);

/* ---------------- DATABASE CONFIG ---------------- */
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

/* ---------------- CONNECT DATABASE ---------------- */
sql.connect(config)
    .then(() => console.log("✅ Database connected successfully"))
    .catch(err => console.log("❌ Database connection failed:", err));

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});