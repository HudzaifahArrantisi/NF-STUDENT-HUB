import React from 'react';
import { Link } from 'react-router-dom';
import PillNav from '../PillNav';
import Footer from '../../components/Footer';

const CurriculumPage = () => {
  const logoDataURL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEuOCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIvPjxlbGxpcHNlIGN4PSIxMiIgY3k9IjEyIiByeD0iMTAiIHJ5PSI0LjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDEyIDEyKSIvPjxlbGxpcHNlIGN4PSIxMiIgY3k9IjEyIiByeD0iMTAiIHJ5PSI0LjUiIHRyYW5zZm9ybT0icm90YXRlKDEyMCAxMiAxMikiLz48ZWxsaXBzZSBjeD0iMTIiIGN5PSIxMiIgcng9IjEwIiByeT0iNC41Ii8+PC9zdmc+";

  const curriculumData = [
    {
      semester: "Semester 1",
      courses: [
        { name: "Pembentukan Karakter", credits: 2 },
        { name: "Pendidikan Agama", credits: 2 },
        { name: "Bahasa Indonesia", credits: 2 },
        { name: "Matematika Komputer", credits: 3 },
        { name: "Dasar-Dasar Pemrograman", credits: 3 },
        { name: "Pengantar Teknologi Informasi", credits: 3 },
        { name: "Sistem Operasi", credits: 3 },
        { name: "Pemrograman Web 1", credits: 3 }
      ],
      totalCredits: 21
    },
    {
      semester: "Semester 2",
      courses: [
        { name: "Komunikasi Efektif", credits: 2 },
        { name: "Pendidikan Pancasila dan Kewarganegaraan", credits: 2 },
        { name: "Bahasa Inggris 1", credits: 2 },
        { name: "Statistik dan Probabilitas", credits: 2 },
        { name: "Basis Data", credits: 4 },
        { name: "User Interface & User Experience", credits: 3 },
        { name: "Jaringan Komputer", credits: 3 },
        { name: "Pemrograman Web 2", credits: 3 }
      ],
      totalCredits: 21
    },
    {
      semester: "Semester 3",
      courses: [
        { name: "Kewirausahaan", credits: 2 },
        { name: "Bahasa Inggris 2", credits: 2 },
        { name: "Rekayasa Perangkat Lunak", credits: 3 },
        { name: "Big Data", credits: 3 },
        { name: "Teori Bahasa dan Otomata", credits: 2 },
        { name: "Pemrograman Backend", credits: 3 },
        { name: "Keamanan Web", credits: 3 },
        { name: "Pola Desain Perangkat Lunak", credits: 3 }
      ],
      totalCredits: 21
    },
    {
      semester: "Semester 4",
      courses: [
        { name: "Etika Profesi", credits: 2 },
        { name: "Manajemen Proyek", credits: 3 },
        { name: "Kecerdasan Artifisial", credits: 3 },
        { name: "Cloud Computing", credits: 2 },
        { name: "Keamanan Komputer dan Jaringan", credits: 2 },
        { name: "Jaminan Kualitas Perangkat Lunak", credits: 3 },
        { name: "Visualisasi Data", credits: 3 },
        { name: "Pemrograman Frontend", credits: 3 }
      ],
      totalCredits: 21
    },
    {
      semester: "Semester 5",
      courses: [
        { name: "Mata Kuliah Pilihan", credits: 3 },
        { name: "Mata Kuliah Pilihan", credits: 3 },
        { name: "Mata Kuliah Pilihan", credits: 3 },
        { name: "Mata Kuliah Pilihan", credits: 3 },
        { name: "Mata Kuliah Pilihan", credits: 3 },
        { name: "Mata Kuliah Pilihan", credits: 3 },
        { name: "Mata Kuliah Pilihan", credits: 3 }
      ],
      totalCredits: 21,
      note: "* Bisa memilih mata kuliah pilihan di prodi sendiri maupun prodi lain"
    },
    {
      semester: "Semester 6",
      courses: [
        { name: "Keterampilan Kerjasama", credits: 3 },
        { name: "Teknik Identifikasi Masalah", credits: 3 },
        { name: "Analisis dan Desain Solusi", credits: 3 },
        { name: "Pengujian Desain Solusi", credits: 3 },
        { name: "Technopreneurship", credits: 4 },
        { name: "Proyek Kerja Praktek 1", credits: 4 }
      ],
      totalCredits: 20
    },
    {
      semester: "Semester 7",
      courses: [
        { name: "Keterampilan Kepemimpinan", credits: 3 },
        { name: "Implementasi Solusi", credits: 3 },
        { name: "Presentasi Proyek", credits: 3 },
        { name: "Penulisan Dokumentasi Proyek", credits: 3 },
        { name: "Integrasi Sistem", credits: 4 },
        { name: "Proyek Kerja Praktek 2", credits: 4 }
      ],
      totalCredits: 20
    },
    {
      semester: "Semester 8",
      courses: [
        { name: "Tugas Akhir", credits: 4 }
      ],
      totalCredits: 4
    }
  ];

  const Footer = () => (
    <footer className="bg-gray-900/80 backdrop-blur-md text-gray-400 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-white text-2xl font-bold mb-4">NF StudentHub</h3>
          <p className="mb-4 max-w-md">
            Platform akademik modern yang mengintegrasikan pembelajaran dengan pengalaman sosial media untuk mahasiswa, dosen, dan orang tua.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-white transition">Fitur</a></li>
            <li><a href="/kurikulum" className="hover:text-white transition">Kurikulum</a></li>
            <li><a href="/visi-misi" className="hover:text-white transition">Visi Misi</a></li>
            <li><a href="/kalender-akademik" className="hover:text-white transition">Kalender</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Perusahaan</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Tentang Kami</a></li>
            <li><a href="#" className="hover:text-white transition">Karir</a></li>
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
            <li><a href="#" className="hover:text-white transition">Kontak</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-gray-800 text-center">
        <p>&copy; {new Date().getFullYear()} NF StudentHub. All rights reserved.</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white font-sans">
      {/* Navigation */}
      <PillNav
        logo={logoDataURL}
        logoAlt="NF StudentHub Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Visi Misi', href: '/visi-misi' },
          { label: 'Kalender', href: '/kalender-akademik' },
          { label: 'Login', href: '/login' }
        ]}
        activeHref="/kurikulum"
        className="custom-nav"
        ease="power6.easeOut"
        baseColor="#fff"
        pillColor="#060010"
        hoveredPillTextColor="#060010"
        pillTextColor="#ffffff"
      />

      {/* Header dengan Back Button */}
      <header className="pt-32 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors duration-300 mb-6 group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Kembali ke Beranda
          </Link>
          
          <div className="text-center">
            <h1 className="font-bold text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
              Struktur Kurikulum
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Program Studi Teknik Informatika - Berlaku untuk Angkatan 2020 ke bawah
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculumData.map((semester, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-purple-400/30 group"
              >
                <div className={`h-2 transition-all duration-500 group-hover:h-3 ${
                  index % 4 === 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 
                  index % 4 === 1 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 
                  index % 4 === 2 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
                  'bg-gradient-to-r from-yellow-500 to-orange-500'
                }`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{semester.semester}</h3>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                      {semester.totalCredits} SKS
                    </span>
                  </div>
                  <div className="space-y-3">
                    {semester.courses.map((course, courseIndex) => (
                      <div 
                        key={courseIndex} 
                        className="flex justify-between items-start pb-3 border-b border-gray-700/50 last:border-0 group/item hover:bg-gray-700/30 -mx-2 px-2 rounded-lg transition-colors duration-200"
                      >
                        <div className="text-gray-300 text-sm flex-1 group-hover/item:text-white transition-colors">
                          {course.name}
                        </div>
                        <div className="text-white font-bold ml-2 bg-gray-700/50 px-2 py-1 rounded text-xs">
                          {course.credits} SKS
                        </div>
                      </div>
                    ))}
                  </div>
                  {semester.note && (
                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-xs text-yellow-300 italic">{semester.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CurriculumPage;