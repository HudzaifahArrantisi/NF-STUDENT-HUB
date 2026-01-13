// src/data/mockPosts.js
export const mockPosts = [
  {
    id: 1,
    role: 'admin',
    author_name: 'Admin Kampus',
    content: 'Pengumuman penting: Libur semester ganjil akan dimulai tanggal 15 Desember 2024. Selamat beristirahat dan persiapkan diri untuk semester berikutnya! 📚🎓',
    image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes_count: 45,
    comments_count: 12,
    user_has_liked: false,
    user_has_saved: false,
    comments: [
      {
        id: 101,
        author_name: 'Budi Santoso',
        role: 'mahasiswa',
        content: 'Terima kasih infonya!',
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: 2,
    role: 'ukm',
    author_name: 'UKM Basket',
    content: '🏀 OPEN RECRUITMENT UKM BASKET! 🏀\n\nBagi yang berminat bergabung dengan UKM Basket, silakan datang pada:\n📅 Sabtu, 10 Desember 2024\n⏰ 15.00 WIB\n📍 Lapangan Basket Kampus\n\nBawa semangat dan sepatu olahragamu! 🔥',
    image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes_count: 89,
    comments_count: 23,
    user_has_liked: true,
    user_has_saved: true,
    comments: [
      {
        id: 201,
        author_name: 'Sari Indah',
        role: 'mahasiswa',
        content: 'Wah seru banget! Aku mau ikut nih',
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 202,
        author_name: 'Coach Andi',
        role: 'dosen',
        content: 'Semangat untuk UKM Basket!',
        created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: 3,
    role: 'dosen',
    author_name: 'Dr. Ahmad Wijaya, M.Kom',
    content: 'Untuk mahasiswa kelas Pemrograman Web:\nTugas project akhir sudah bisa diambil di classroom. Deadline pengumpulan 2 minggu dari hari ini. Jangan lupa untuk mengikuti ketentuan yang sudah dijelaskan di kelas.',
    attachment_url: '/files/tugas-pemweb.pdf',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likes_count: 34,
    comments_count: 8,
    user_has_liked: false,
    user_has_saved: false,
    comments: []
  },
  {
    id: 4,
    role: 'ormawa',
    author_name: 'BEM Fakultas',
    content: '🎉 SELAMAT! 🎉\n\nKepada seluruh pemenang Lomba Inovasi Digital 2024. Terima kasih atas partisipasinya. Tetap semangat berinovasi! 💡',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551135049-8a33b42738b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
      },
      {
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
      },
      {
        url: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
      }
    ],
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likes_count: 156,
    comments_count: 45,
    user_has_liked: true,
    user_has_saved: false,
    comments: [
      {
        id: 401,
        author_name: 'Rina Melati',
        role: 'mahasiswa',
        content: 'Keren banget acaranya! Tahun depan ikut lagi',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
]