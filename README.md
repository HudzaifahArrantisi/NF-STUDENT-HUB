# 🎓 NF StudentHub

![Status](https://img.shields.io/badge/Status-Active-success)
![Platform](https://img.shields.io/badge/Platform-Web-blue)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Go-orange)
![License](https://img.shields.io/badge/License-Academic-lightgrey)

**NF StudentHub** adalah platform digital terintegrasi untuk ekosistem akademik  
**STT Nurul Fikri**, yang menghubungkan **Mahasiswa, Dosen, Admin, Orang Tua, UKM, dan ORMAWA**  
dalam satu sistem berbasis web yang modern, aman, dan scalable.

> One platform. One ecosystem. One academic experience.

---

## 📑 Daftar Isi
- [Gambaran Umum](#-gambaran-umum)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Struktur Proyek](#-struktur-proyek)
- [Role & Permission](#-role--permission)
- [API Documentation](#-api-documentation)
- [Keamanan](#-keamanan)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 📌 Gambaran Umum

NF StudentHub dirancang sebagai **one-stop academic platform** untuk memusatkan seluruh layanan kampus yang sebelumnya tersebar di banyak sistem.

Aplikasi ini mengintegrasikan:
- Manajemen akademik
- Sistem pembayaran
- Absensi berbasis QR
- Komunikasi real-time
- Media informasi kampus (feed seperti social media)

Dengan pendekatan **role-based system**, setiap pengguna hanya dapat mengakses fitur sesuai dengan perannya.

---

## ✨ Fitur Utama

### 🎓 Mahasiswa
- Dashboard akademik (ringkasan nilai & kehadiran)
- Akses materi dan tugas per mata kuliah
- Pembayaran UKT & tracking invoice
- Transkrip nilai & IPK
- Scan absensi QR Code
- Chat & notifikasi real-time
- Profil publik mahasiswa

### 👨‍🏫 Dosen
- Kelola mata kuliah & pertemuan
- Upload materi & tugas
- Input nilai mahasiswa
- Generate QR absensi
- Komunikasi dengan mahasiswa

### 🛠️ Admin
- Manajemen akun pengguna
- Posting pengumuman kampus
- Monitoring pembayaran UKT
- Pengaturan sistem
- Dashboard analytics

### 👨‍👩‍👧 Orang Tua
- Monitoring kehadiran mahasiswa
- Akses status pembayaran UKT
- Notifikasi real-time
- Akses profil akademik anak

### 🏫 UKM & ORMAWA
- Posting kegiatan & pengumuman
- Kelola profil organisasi
- Interaksi sosial (like & komentar)
- Dashboard organisasi

---

## 🛠️ Teknologi

### Frontend
- **React 19**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **React Query**
- **Axios**
- **GSAP**
- **Three.js**
- **React Icons**

### Backend
- **Golang**
- **Gin / Fiber**
- **JWT Authentication**
- **MySQL / PostgreSQL**
- **WebSocket** (Real-time chat)
- **QR Code System**

---

## 🚀 Instalasi

### Prasyarat
- Node.js ≥ 16
- Go ≥ 1.20
- MySQL / PostgreSQL
- npm / yarn

### Clone Repository
```bash
git clone https://github.com/HudzaifahArrantisi/NF-STUDENT-HUB.git
cd NF-Student-HUB
Setup Frontend
bash
Salin kode
cd frontend
npm install
Setup Backend
bash
Salin kode
cd backend
go mod download
```

---

## ⚙️ Konfigurasi

### Environment Variables

**Frontend:**
```bash
# Copy dan rename file .env.example menjadi .env.local
cp frontend/.env.example frontend/.env.local
```

**Backend:**
```bash
# Copy dan rename file .env.example menjadi .env
cp backend/.env.example backend/.env
```

⚠️ **Penting:** 
- Jangan commit file `.env` ke repository
- Edit file `.env` dengan konfigurasi sesuai environment Anda
- Lihat file `.env.example` untuk daftar lengkap variable yang tersedia

---

## ▶️ Menjalankan Aplikasi

### Development Mode

**Frontend:**
```bash
npm run dev
```
Akses: http://localhost:5173

**Backend:**
```bash
go run main.go
```
API: http://localhost:8080

### Production
```bash
npm run build
go build -o app
./app
```

---

## 📁 Struktur Proyek
css
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
```

---

## 👥 Role & Permission

| Role | Dashboard | Akademik | Chat | Payment | Admin |
|------|-----------|----------|------|---------|-------|
| Mahasiswa | ✅ | ✅ | ✅ | ✅ | ❌ |
| Dosen | ✅ | ✅ | ✅ | ❌ | ❌ |
| Admin | ✅ | ✅ | ✅ | ✅ | ✅ |
| Orang Tua | ✅ | ✅ | ✅ | ✅ | ❌ |
| UKM | ✅ | ❌ | ✅ | ❌ | ✅ |
| ORMAWA | ✅ | ❌ | ✅ | ❌ | ✅ |

---

## 📚 API Documentation

### Auth
```http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
```

### Mahasiswa
```http
GET  /api/mahasiswa/profile
GET  /api/mahasiswa/nilai
POST /api/mahasiswa/pembayaran-ukt
```

### Dosen
```http
POST /api/dosen/matkul/:id/tugas
PUT  /api/dosen/penilaian/:id
```

### Chat
```http
WS /ws/chat
```

📂 **Detail lengkap:** Lihat `/backend/routes`

---

## 🔐 Keamanan

- ✅ JWT Authentication
- ✅ Password hashing (bcrypt)
- ✅ Role-Based Access Control (RBAC)
- ✅ Input validation
- ✅ CORS protection
- ✅ SQL Injection prevention


---

## 🤝 Kontribusi

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit sesuai convention (`git commit -m 'feat: Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik.  
Penggunaan komersial memerlukan izin resmi.

---

**Last Updated:** Januari 2026  
**Version:** 1.0.0
