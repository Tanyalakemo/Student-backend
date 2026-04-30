const express = require("express");
const router = express.Router();
const pool = require("../db");

/* ---------------- GET ALL STUDENTS ---------------- */
router.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Students"');
        res.json(result.rows);
    } catch (err) {
        console.log("GET ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

/* ---------------- GET STUDENT BY ID ---------------- */
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM "Students" WHERE "StudentID" = $1',
            [id]
        );
        const student = result.rows[0];
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
        await pool.query(
            `INSERT INTO "Students" ("FullName", "Course", "DOB", "Gender", "Contact", "Residence")
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [name, course, dob, gender, contact, residence]
        );
        res.json({ message: "Student added successfully" });
    } catch (err) {
        console.log("POST ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;