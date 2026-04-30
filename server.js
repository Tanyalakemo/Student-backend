require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors({
    origin: 'https://student-directory-frontend-rust.vercel.app'
}));
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

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});