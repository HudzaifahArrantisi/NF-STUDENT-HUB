-- Insert sample users
INSERT INTO users (email, password, role) VALUES 
('admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('dosen1@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'dosen'),
('mhs1@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'mahasiswa'),
('ortu1@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'orangtua'),
('ukm1@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ukm'),
('ormawa1@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ormawa');

-- Insert sample mahasiswa
INSERT INTO mahasiswa (user_id, name, nim) VALUES 
(3, 'Alice Student', '1234567890');

-- Insert sample dosen
INSERT INTO dosen (user_id, name, nip) VALUES 
(2, 'Dr. Budi Dosen', 'NIP001');

-- Insert sample admin
INSERT INTO admin (user_id, name) VALUES 
(1, 'Admin System');

-- Insert sample ortu
INSERT INTO ortu (user_id, name, child_id) VALUES 
(4, 'Orang Tua Alice', 1);

-- Insert sample ukm
INSERT INTO ukm (user_id, name) VALUES 
(5, 'UKM Seni');

-- Insert sample ormawa
INSERT INTO ormawa (user_id, name) VALUES
(6, 'Ormawa Mahasiswa');

-- Insert sample mata_kuliah
INSERT INTO mata_kuliah (kode, nama, dosen_id, hari, jam_mulai, jam_selesai, sks, semester) VALUES
('DEV001', 'Pengembangan Perangkat Lunak', 1, 'Senin', '08:00', '10:00', 3, 3),
('CS101', 'Algoritma dan Pemrograman', 1, 'Selasa', '10:00', '12:00', 3, 3),
('DB201', 'Basis Data', 1, 'Rabu', '13:00', '15:00', 3, 3);

-- Insert sample mahasiswa_mata_kuliah (enrollments)
INSERT INTO mahasiswa_mata_kuliah (mahasiswa_id, mata_kuliah_kode) VALUES
(1, 'DEV001'),
(1, 'CS101'),
(1, 'DB201');

-- Insert sample posts
INSERT INTO posts (user_id, role, title, content, media_url) VALUES 
(1, 'admin', 'Pengumuman Penting', 'Ini adalah pengumuman penting dari admin', NULL),
(5, 'ukm', 'Acara Seni Mendatang', 'UKM Seni akan mengadakan acara besar bulan depan', NULL),
(6, 'ormawa', 'Rapat Mahasiswa', 'Rapat mahasiswa akan diadakan minggu depan', NULL);

-- Insert sample tugas
INSERT INTO tugas (course_id, title, desc, due_date) VALUES 
('CS101', 'Tugas Pemrograman', 'Buat aplikasi sederhana menggunakan Go', '2024-01-15 23:59:59');

-- Insert sample ukt invoice
INSERT INTO ukt_invoices (student_id, amount, uuid, status) VALUES 
(1, 5000000.00, 'uuid-12345-67890', 'pending');