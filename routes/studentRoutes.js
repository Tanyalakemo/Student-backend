const express = require("express");
const router = express.Router();
const sql = require("mssql");

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

/* ---------------- GET ALL STUDENTS ---------------- */
router.get("/", async (req, res) => {
    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .query("SELECT * FROM Students");

        res.json(result.recordset);

    } catch (err) {
        console.log("GET ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

/* ---------------- GET STUDENT BY ID ---------------- */
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM Students WHERE StudentID = @id");

        const student = result.recordset[0];

        // ✅ prevent frontend crash
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);

    } catch (err) {
        console.log("DETAILS ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

/* ---------------- ADD STUDENT ---------------- */
router.post("/", async (req, res) => {
    const { name, course, dob, gender, contact, residence } = req.body;

    try {
        const pool = await sql.connect(config);

        await pool.request()
            .input("fullName", sql.VarChar, name)
            .input("course", sql.VarChar, course)
            .input("dob", sql.Date, dob)
            .input("gender", sql.VarChar, gender)
            .input("contact", sql.VarChar, contact)
            .input("residence", sql.VarChar, residence)
            .query(`
                INSERT INTO Students 
                (FullName, Course, DOB, Gender, Contact, Residence)
                VALUES (@fullName, @course, @dob, @gender, @contact, @residence)
            `);

        res.json({ message: "Student added successfully" });

    } catch (err) {
        console.log("POST ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;