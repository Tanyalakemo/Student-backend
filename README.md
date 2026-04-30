# 📚 Student Directory System

A full-stack web application for managing student records. Users can add, view, and search for students through a clean and responsive interface.

---

## 🌐 Live URL

https://student-directory-frontend-rust.vercel.app/

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js / Express |
| Database | PostgreSQL (Supabase) |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## ✨ Features

- 👥 View all students
- ➕ Add a new student
- 🔍 Search for students
- 🔐 User authentication (Login & Register)

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed
- Git installed

### 1. Clone the repositories

Frontend:
git clone https://github.com/Tanyalakemo/Student-directory-Frontend.git
cd Student-directory-Frontend

Backend:
git clone https://github.com/Tanyalakemo/Student-backend.git
cd Student-backend

### 2. Install dependencies
npm install

### 3. Configure environment variables
Create a .env file in the backend folder:
DATABASE_URL=your_supabase_connection_string

### 4. Run locally
Frontend: npm start
Backend: node server.js

---

## 🗄️ Database

The application uses Supabase (PostgreSQL) with the following tables:
- Students - stores student records (FullName, Course, DOB, Gender, Contact, Residence)
- Users - stores user accounts for authentication

---

## 🚀 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://student-directory-frontend-rust.vercel.app/ |
| Backend | Render | https://student-backend-infs-202.onrender.com |
| Database | Supabase | PostgreSQL (cloud) |

---

## 👩‍💻 Author

Tanyalakemo
GitHub: https://github.com/Tanyalakemo