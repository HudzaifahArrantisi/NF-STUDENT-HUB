# 🎓 NF StudentHub

![Status](https://img.shields.io/badge/Status-Active-success)
![Platform](https://img.shields.io/badge/Platform-Web-blue)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Go-orange)
![License](https://img.shields.io/badge/License-Academic-lightgrey)

**NF StudentHub** is an integrated digital platform for the academic ecosystem of  
**STT Nurul Fikri**, connecting **Students, Lecturers, Administrators, Parents, Student Clubs (UKM), and Student Organizations (ORMAWA)**  
into a single modern, secure, and scalable web-based system.

> One platform. One ecosystem. One academic experience.

---

## 📑 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Roles & Permissions](#-roles--permissions)
- [API Documentation](#-api-documentation)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📌 Overview

NF StudentHub is designed as a **one-stop academic platform** that centralizes all campus services that were previously distributed across multiple systems.

This platform integrates:
- Academic management
- Tuition and payment systems
- QR-based attendance
- Real-time communication
- Campus information feed (social media–like experience)

Using a **role-based access control (RBAC)** system, each user can only access features relevant to their assigned role.

---

## ✨ Key Features

### 🎓 Students
- Academic dashboard (grades & attendance summary)
- Access to course materials and assignments
- Tuition (UKT) payment & invoice tracking
- Academic transcript & GPA
- QR Code attendance scanning
- Real-time chat & notifications
- Public student profile

### 👨‍🏫 Lecturers
- Manage courses and class sessions
- Upload learning materials & assignments
- Input and manage student grades
- Generate QR codes for attendance
- Communicate with students

### 🛠️ Administrators
- User account management
- Campus announcements
- Tuition payment monitoring
- System configuration
- Analytics dashboard

### 👨‍👩‍👧 Parents
- Monitor student attendance
- Access tuition payment status
- Real-time notifications
- View student academic profile

### 🏫 UKM & ORMAWA
- Post activities and announcements
- Manage organization profiles
- Social interactions (likes & comments)
- Organization dashboard

---

## 🛠️ Technology Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router
- React Query
- Axios
- GSAP
- Three.js
- React Icons

### Backend
- Golang
- Gin / Fiber
- JWT Authentication
- MySQL / PostgreSQL
- WebSocket (Real-time chat)
- QR Code System

---

## 🚀 Installation

### Prerequisites
- Node.js ≥ 16
- Go ≥ 1.20
- MySQL or PostgreSQL
- npm or yarn

### Clone Repository
```bash
git clone https://github.com/HudzaifahArrantisi/NF-STUDENT-HUB.git
cd NF-Student-HUB
Frontend Setup
bash
Salin kode
cd frontend
npm install
Backend Setup
bash
Salin kode
cd backend
go mod download
⚙️ Configuration
Environment Variables
Frontend

bash
Salin kode
cp frontend/.env.example frontend/.env.local
Backend

bash
Salin kode
cp backend/.env.example backend/.env
⚠️ Important:

Never commit .env files to the repository

Adjust environment variables according to your setup

Refer to .env.example for available configuration options

▶️ Running the Application
Development Mode
Frontend

bash
Salin kode
npm run dev
Access: http://localhost:5173

Backend

bash
Salin kode
go run main.go
API: http://localhost:8080

Production Mode
bash
Salin kode
npm run build
go build -o app
./app
📁 Project Structure
bash
Salin kode
NF-Student-HUB/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.jsx
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── handlers/
│   └── main.go
└── README.md
👥 Roles & Permissions
Role	Dashboard	Academic	Chat	Payment	Admin
Student	✅	✅	✅	✅	❌
Lecturer	✅	✅	✅	❌	❌
Admin	✅	✅	✅	✅	✅
Parent	✅	✅	✅	✅	❌
UKM	✅	❌	✅	❌	✅
ORMAWA	✅	❌	✅	❌	✅

📚 API Documentation
Authentication
http
Salin kode
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
Student
http
Salin kode
GET  /api/mahasiswa/profile
GET  /api/mahasiswa/nilai
POST /api/mahasiswa/pembayaran-ukt
Lecturer
http
Salin kode
POST /api/dosen/matkul/:id/tugas
PUT  /api/dosen/penilaian/:id
Chat
http
Salin kode
WS /ws/chat
📂 Full details available in /backend/routes

🔐 Security
JWT Authentication

Password hashing (bcrypt)

Role-Based Access Control (RBAC)

Input validation

CORS protection

SQL Injection prevention

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit following conventions (git commit -m 'feat: Add AmazingFeature')

Push to your branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is developed for academic purposes.
Commercial use requires official permission.

Last Updated: January 2026
Version: 1.0.0
