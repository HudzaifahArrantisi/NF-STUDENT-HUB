// Data mock untuk testing jika backend belum siap
export const mockProfiles = {
  admin: {
    id: 1,
    name: 'Admin Kampus',
    username: 'admin_kampus',
    email: 'admin@kampus.ac.id',
    bio: 'Official account administrator kampus',
    website: 'https://kampus.ac.id',
    phone: '+62 812-3456-7890',
    role: 'admin',
    posts_count: 15,
    followers_count: 1200,
    following_count: 45
  },
  ukm: {
    id: 2,
    name: 'UKM Musik',
    username: 'ukm_musik',
    email: 'musik@kampus.ac.id',
    bio: 'Unit Kegiatan Mahasiswa Musik - Bermusik bersama meraih harmoni',
    website: 'https://ukm-musik.kampus.ac.id',
    phone: '+62 823-4567-8901',
    role: 'ukm',
    posts_count: 8,
    followers_count: 450,
    following_count: 12
  },
  ormawa: {
    id: 3,
    name: 'BEM Fakultas',
    username: 'bem_fakultas',
    email: 'bem@fakultas.kampus.ac.id',
    bio: 'Badan Eksekutif Mahasiswa Fakultas - Wadah aspirasi mahasiswa',
    website: 'https://bem.fakultas.kampus.ac.id',
    phone: '+62 834-5678-9012',
    role: 'ormawa',
    posts_count: 23,
    followers_count: 1200,
    following_count: 25
  }
}

export const mockPosts = {
  1: [
    {
      id: 1,
      title: 'Pengumuman Penting',
      content: 'Diinformasikan kepada seluruh mahasiswa mengenai jadwal UTS semester ganjil 2024',
      media_url: '/uploads/announcement.jpg',
      author_name: 'Admin Kampus',
      author_id: 1,
      role: 'admin',
      created_at: '2024-01-15T10:00:00Z',
      likes_count: 45
    }
  ],
  2: [
    {
      id: 2,
      title: 'Audisi Band Kampus',
      content: 'Dibuka pendaftaran audisi untuk band kampus. Segera daftar!',
      media_url: '/uploads/audition.jpg',
      author_name: 'UKM Musik',
      author_id: 2,
      role: 'ukm',
      created_at: '2024-01-14T15:30:00Z',
      likes_count: 78
    }
  ],
  3: [
    {
      id: 3,
      title: 'Rapat Umum Mahasiswa',
      content: 'Akan diadakan rapat umum mahasiswa untuk membahas agenda semester depan',
      media_url: '/uploads/meeting.jpg',
      author_name: 'BEM Fakultas',
      author_id: 3,
      role: 'ormawa',
      created_at: '2024-01-13T09:15:00Z',
      likes_count: 112
    }
  ]
}
