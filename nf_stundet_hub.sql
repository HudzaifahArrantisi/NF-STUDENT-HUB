mysql> use nf_student_hub3;
Database changed
mysql> show tables;
+---------------------------+
| Tables_in_nf_student_hub3 |
+---------------------------+
| admin                     |
| attendance                |
| attendance_sessions       |
| attendance_summary        |
| comments                  |
| content_moderation        |
| conversation_participants |
| conversations             |
| dosen                     |
| likes                     |
| mahasiswa                 |
| mahasiswa_mata_kuliah     |
| mata_kuliah               |
| mata_kuliah_chat_groups   |
| messages                  |
| notifications             |
| ormawa                    |
| ortu                      |
| payment_logs              |
| pertemuan_mata_kuliah     |
| pinned_conversations      |
| post_engagements          |
| posts                     |
| riwayat_pembayaran        |
| saved_posts               |
| schedule                  |
| submissions               |
| tugas                     |
| ukm                       |
| ukt_invoices              |
| users                     |
| webhook_logs              |
| webhook_test              |
+---------------------------+
33 rows in set (0.02 sec)

mysql> desc admin;
+-----------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field           | Type         | Null | Key | Default           | Extra                                         |
+-----------------+--------------+------+-----+-------------------+-----------------------------------------------+
| id              | int          | NO   | PRI | NULL              | auto_increment                                |
| user_id         | int          | NO   | MUL | NULL              |                                               |
| name            | varchar(255) | NO   |     | NULL              |                                               |
| created_at      | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at      | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at      | timestamp    | YES  |     | NULL              |                                               |
| username        | varchar(100) | YES  | UNI | NULL              |                                               |
| bio             | text         | YES  |     | NULL              |                                               |
| website         | varchar(255) | YES  |     | NULL              |                                               |
| phone           | varchar(20)  | YES  |     | NULL              |                                               |
| profile_picture | varchar(255) | YES  |     | NULL              |                                               |
| followers_count | int          | YES  |     | 0                 |                                               |
| following_count | int          | YES  |     | 0                 |                                               |
+-----------------+--------------+------+-----+-------------------+-----------------------------------------------+
13 rows in set (0.01 sec)

mysql> desc attendance;
+--------------+-------------------------------------+------+-----+-------------------+-----------------------------------------------+
| Field        | Type                                | Null | Key | Default           | Extra                                         |
+--------------+-------------------------------------+------+-----+-------------------+-----------------------------------------------+
| id           | int                                 | NO   | PRI | NULL              | auto_increment                                |
| student_id   | int                                 | NO   | MUL | NULL              |                                               |
| session_id   | varchar(255)                        | NO   | MUL | NULL              |                                               |
| student_code | varchar(255)                        | NO   |     | NULL              |                                               |
| status       | enum('hadir','izin','sakit','alpa') | YES  |     | hadir             |                                               |
| created_at   | timestamp                           | YES  | MUL | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at   | timestamp                           | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at   | timestamp                           | YES  |     | NULL              |                                               |
| created_date | date                                | YES  |     | NULL              | STORED GENERATED                              |
| pertemuan_ke | int                                 | YES  |     | 1                 |                                               |
+--------------+-------------------------------------+------+-----+-------------------+-----------------------------------------------+
10 rows in set (0.00 sec)

mysql> desc attendance_sessions;
+---------------+-------------------------+------+-----+-------------------+-----------------------------------------------+
| Field         | Type                    | Null | Key | Default           | Extra                                         |
+---------------+-------------------------+------+-----+-------------------+-----------------------------------------------+
| id            | int                     | NO   | PRI | NULL              | auto_increment                                |
| dosen_id      | int                     | NO   | MUL | NULL              |                                               |
| course_id     | varchar(10)             | NO   | MUL | NULL              |                                               |
| session_token | varchar(100)            | YES  |     | NULL              |                                               |
| session_code  | varchar(50)             | NO   | UNI | NULL              |                                               |
| qr_token      | varchar(100)            | YES  |     | NULL              |                                               |
| expires_at    | timestamp               | NO   |     | NULL              |                                               |
| status        | enum('active','closed') | YES  | MUL | active            |                                               |
| created_at    | timestamp               | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| pertemuan_ke  | int                     | YES  |     | 1                 |                                               |
| updated_at    | timestamp               | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+---------------+-------------------------+------+-----+-------------------+-----------------------------------------------+
11 rows in set (0.00 sec)

mysql> desc attendance_summary;
+-----------------+-------------------------------------+------+-----+---------+-------+
| Field           | Type                                | Null | Key | Default | Extra |
+-----------------+-------------------------------------+------+-----+---------+-------+
| student_id      | int                                 | NO   |     | NULL    |       |
| nim             | varchar(50)                         | NO   |     | NULL    |       |
| student_name    | varchar(255)                        | NO   |     | NULL    |       |
| session_id      | varchar(255)                        | NO   |     | NULL    |       |
| course_id       | varchar(10)                         | NO   |     | NULL    |       |
| course_name     | varchar(255)                        | NO   |     | NULL    |       |
| status          | enum('hadir','izin','sakit','alpa') | YES  |     | hadir   |       |
| attendance_date | date                                | YES  |     | NULL    |       |
| attendance_time | time                                | YES  |     | NULL    |       |
| dosen_name      | varchar(255)                        | NO   |     | NULL    |       |
| hari            | varchar(10)                         | YES  |     | NULL    |       |
| jam_mulai       | time                                | YES  |     | NULL    |       |
| jam_selesai     | time                                | YES  |     | NULL    |       |
+-----------------+-------------------------------------+------+-----+---------+-------+
13 rows in set (0.00 sec)

mysql> desc comments;
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field       | Type         | Null | Key | Default           | Extra                                         |
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
| id          | int          | NO   | PRI | NULL              | auto_increment                                |
| post_id     | int          | NO   | MUL | NULL              |                                               |
| parent_id   | int          | YES  | MUL | NULL              |                                               |
| user_id     | int          | NO   | MUL | NULL              |                                               |
| user_role   | varchar(50)  | NO   |     | NULL              |                                               |
| author_name | varchar(255) | NO   |     | NULL              |                                               |
| content     | text         | NO   |     | NULL              |                                               |
| created_at  | timestamp    | YES  | MUL | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at  | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at  | timestamp    | YES  |     | NULL              |                                               |
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
10 rows in set (0.00 sec)

mysql> desc content_moderation;
+--------------+---------------------------------------+------+-----+-------------------+-------------------+
| Field        | Type                                  | Null | Key | Default           | Extra             |
+--------------+---------------------------------------+------+-----+-------------------+-------------------+
| id           | int                                   | NO   | PRI | NULL              | auto_increment    |
| content_type | enum('post','comment')                | NO   |     | NULL              |                   |
| content_id   | int                                   | NO   |     | NULL              |                   |
| status       | enum('pending','approved','rejected') | YES  |     | pending           |                   |
| moderated_by | int                                   | YES  | MUL | NULL              |                   |
| reason       | text                                  | YES  |     | NULL              |                   |
| created_at   | timestamp                             | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+--------------+---------------------------------------+------+-----+-------------------+-------------------+
7 rows in set (0.00 sec)

mysql> desc conversation_participants;
+-----------------+--------------------------------+------+-----+-------------------+-------------------+
| Field           | Type                           | Null | Key | Default           | Extra             |
+-----------------+--------------------------------+------+-----+-------------------+-------------------+
| id              | int                            | NO   | PRI | NULL              | auto_increment    |
| conversation_id | int                            | NO   | MUL | NULL              |                   |
| user_id         | int                            | NO   | MUL | NULL              |                   |
| role            | enum('admin','member','owner') | YES  |     | member            |                   |
| joined_at       | timestamp                      | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| last_read_at    | timestamp                      | YES  |     | NULL              |                   |
+-----------------+--------------------------------+------+-----+-------------------+-------------------+
6 rows in set (0.00 sec)

mysql> desc conversations;
+----------------+-------------------------+------+-----+-------------------+-----------------------------------------------+
| Field          | Type                    | Null | Key | Default           | Extra                                         |
+----------------+-------------------------+------+-----+-------------------+-----------------------------------------------+
| id             | int                     | NO   | PRI | NULL              | auto_increment                                |
| type           | enum('private','group') | NO   |     | NULL              |                                               |
| name           | varchar(255)            | YES  |     | NULL              |                                               |
| mata_kuliah_id | int                     | YES  | MUL | NULL              |                                               |
| created_by     | int                     | NO   | MUL | NULL              |                                               |
| created_at     | timestamp               | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at     | timestamp               | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+----------------+-------------------------+------+-----+-------------------+-----------------------------------------------+
7 rows in set (0.00 sec)

mysql> desc dosen;
+------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field      | Type         | Null | Key | Default           | Extra                                         |
+------------+--------------+------+-----+-------------------+-----------------------------------------------+
| id         | int          | NO   | PRI | NULL              | auto_increment                                |
| user_id    | int          | NO   | MUL | NULL              |                                               |
| name       | varchar(255) | NO   |     | NULL              |                                               |
| nip        | varchar(100) | YES  | UNI | NULL              |                                               |
| created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at | timestamp    | YES  |     | NULL              |                                               |
+------------+--------------+------+-----+-------------------+-----------------------------------------------+
7 rows in set (0.00 sec)

mysql> desc likes;
+------------+-----------+------+-----+-------------------+-----------------------------------------------+
| Field      | Type      | Null | Key | Default           | Extra                                         |
+------------+-----------+------+-----+-------------------+-----------------------------------------------+
| id         | int       | NO   | PRI | NULL              | auto_increment                                |
| post_id    | int       | NO   | MUL | NULL              |                                               |
| user_id    | int       | NO   | MUL | NULL              |                                               |
| created_at | timestamp | YES  | MUL | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at | timestamp | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at | timestamp | YES  |     | NULL              |                                               |
+------------+-----------+------+-----+-------------------+-----------------------------------------------+
6 rows in set (0.00 sec)

mysql> desc mahasiswa;
+-------------------+---------------+------+-----+-------------------+-----------------------------------------------+
| Field             | Type          | Null | Key | Default           | Extra                                         |
+-------------------+---------------+------+-----+-------------------+-----------------------------------------------+
| id                | int           | NO   | PRI | NULL              | auto_increment                                |
| user_id           | int           | NO   | MUL | NULL              |                                               |
| name              | varchar(255)  | NO   |     | NULL              |                                               |
| nim               | varchar(50)   | NO   | UNI | NULL              |                                               |
| alamat            | text          | YES  |     | NULL              |                                               |
| photo             | varchar(255)  | YES  |     | NULL              |                                               |
| created_at        | timestamp     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at        | timestamp     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at        | timestamp     | YES  |     | NULL              |                                               |
| sisa_ukt          | decimal(15,2) | YES  |     | 7000000.00        |                                               |
| total_ukt_dibayar | decimal(15,2) | YES  |     | 0.00              |                                               |
+-------------------+---------------+------+-----+-------------------+-----------------------------------------------+
11 rows in set (0.00 sec)

mysql> desc mahasiswa_mata_kuliah;
+------------------+--------------+------+-----+-------------------+-------------------+
| Field            | Type         | Null | Key | Default           | Extra             |
+------------------+--------------+------+-----+-------------------+-------------------+
| id               | int          | NO   | PRI | NULL              | auto_increment    |
| mahasiswa_id     | int          | NO   | MUL | NULL              |                   |
| mata_kuliah_kode | varchar(100) | NO   | MUL | NULL              |                   |
| created_at       | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------------+--------------+------+-----+-------------------+-------------------+
4 rows in set (0.00 sec)

mysql> desc mata_kuliah;
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field       | Type         | Null | Key | Default           | Extra                                         |
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
| id          | int          | NO   | PRI | NULL              | auto_increment                                |
| kode        | varchar(100) | NO   | UNI | NULL              |                                               |
| nama        | varchar(255) | NO   |     | NULL              |                                               |
| sks         | int          | NO   |     | NULL              |                                               |
| dosen_id    | int          | NO   | MUL | NULL              |                                               |
| semester    | int          | NO   |     | NULL              |                                               |
| hari        | varchar(10)  | YES  |     | NULL              |                                               |
| jam_mulai   | time         | YES  |     | NULL              |                                               |
| jam_selesai | time         | YES  |     | NULL              |                                               |
| created_at  | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at  | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at  | timestamp    | YES  |     | NULL              |                                               |
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
12 rows in set (0.00 sec)

mysql> desc mata_kuliah_chat_groups;
+-----------------+-----------+------+-----+-------------------+-------------------+
| Field           | Type      | Null | Key | Default           | Extra             |
+-----------------+-----------+------+-----+-------------------+-------------------+
| id              | int       | NO   | PRI | NULL              | auto_increment    |
| mata_kuliah_id  | int       | NO   | UNI | NULL              |                   |
| conversation_id | int       | NO   | MUL | NULL              |                   |
| created_by      | int       | NO   | MUL | NULL              |                   |
| created_at      | timestamp | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-----------------+-----------+------+-----+-------------------+-------------------+
5 rows in set (0.00 sec)

mysql> desc messages;
+-----------------+--------------------------------------+------+-----+-------------------+-----------------------------------------------+
| Field           | Type                                 | Null | Key | Default           | Extra                                         |
+-----------------+--------------------------------------+------+-----+-------------------+-----------------------------------------------+
| id              | int                                  | NO   | PRI | NULL              | auto_increment                                |
| conversation_id | int                                  | NO   | MUL | NULL              |                                               |
| sender_id       | int                                  | NO   | MUL | NULL              |                                               |
| message_type    | enum('text','image','file','system') | YES  |     | text              |                                               |
| content         | text                                 | NO   |     | NULL              |                                               |
| file_url        | varchar(500)                         | YES  |     | NULL              |                                               |
| file_name       | varchar(255)                         | YES  |     | NULL              |                                               |
| file_size       | int                                  | YES  |     | NULL              |                                               |
| is_read         | tinyint(1)                           | YES  |     | 0                 |                                               |
| read_at         | timestamp                            | YES  |     | NULL              |                                               |
| created_at      | timestamp                            | YES  | MUL | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at      | timestamp                            | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at      | timestamp                            | YES  |     | NULL              |                                               |
+-----------------+--------------------------------------+------+-----+-------------------+-----------------------------------------------+
13 rows in set (0.00 sec)

mysql> desc notifications;
+------------+------------------------------------------+------+-----+-------------------+-----------------------------------------------+
| Field      | Type                                     | Null | Key | Default           | Extra                                         |
+------------+------------------------------------------+------+-----+-------------------+-----------------------------------------------+
| id         | int                                      | NO   | PRI | NULL              | auto_increment                                |
| user_id    | int                                      | NO   | MUL | NULL              |                                               |
| type       | enum('like','comment','system','follow') | NO   |     | NULL              |                                               |
| source_id  | int                                      | YES  |     | NULL              |                                               |
| message    | text                                     | NO   |     | NULL              |                                               |
| is_read    | tinyint(1)                               | YES  |     | 0                 |                                               |
| created_at | timestamp                                | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at | timestamp                                | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at | timestamp                                | YES  |     | NULL              |                                               |
+------------+------------------------------------------+------+-----+-------------------+-----------------------------------------------+
9 rows in set (0.00 sec)

mysql> desc ormawa;
+-----------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field           | Type         | Null | Key | Default           | Extra                                         |
+-----------------+--------------+------+-----+-------------------+-----------------------------------------------+
| id              | int          | NO   | PRI | NULL              | auto_increment                                |
| user_id         | int          | NO   | MUL | NULL              |                                               |
| name            | varchar(255) | NO   |     | NULL              |                                               |
| created_at      | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at      | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at      | timestamp    | YES  |     | NULL              |                                               |
| username        | varchar(100) | YES  | UNI | NULL              |                                               |
| bio             | text         | YES  |     | NULL              |                                               |
| website         | varchar(255) | YES  |     | NULL              |                                               |
| phone           | varchar(20)  | YES  |     | NULL              |                                               |
| profile_picture | varchar(255) | YES  |     | NULL              |                                               |
| followers_count | int          | YES  |     | 0                 |                                               |
| following_count | int          | YES  |     | 0                 |                                               |
+-----------------+--------------+------+-----+-------------------+-----------------------------------------------+
13 rows in set (0.00 sec)

mysql> desc ortu;
+------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field      | Type         | Null | Key | Default           | Extra                                         |
+------------+--------------+------+-----+-------------------+-----------------------------------------------+
| id         | int          | NO   | PRI | NULL              | auto_increment                                |
| user_id    | int          | NO   | MUL | NULL              |                                               |
| name       | varchar(255) | NO   |     | NULL              |                                               |
| alamat     | text         | YES  |     | NULL              |                                               |
| child_id   | int          | NO   | MUL | NULL              |                                               |
| created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at | timestamp    | YES  |     | NULL              |                                               |
+------------+--------------+------+-----+-------------------+-----------------------------------------------+
8 rows in set (0.00 sec)

mysql> desc payment_logs;
+--------------+--------------+------+-----+-------------------+-------------------+
| Field        | Type         | Null | Key | Default           | Extra             |
+--------------+--------------+------+-----+-------------------+-------------------+
| id           | int          | NO   | PRI | NULL              | auto_increment    |
| invoice_uuid | varchar(255) | YES  |     | NULL              |                   |
| action       | varchar(50)  | YES  |     | NULL              |                   |
| details      | text         | YES  |     | NULL              |                   |
| created_at   | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+--------------+--------------+------+-----+-------------------+-------------------+
5 rows in set (0.00 sec)

mysql> desc pertemuan_mata_kuliah;
+--------------+--------------+------+-----+-------------------+-------------------+
| Field        | Type         | Null | Key | Default           | Extra             |
+--------------+--------------+------+-----+-------------------+-------------------+
| id           | int          | NO   | PRI | NULL              | auto_increment    |
| course_id    | varchar(10)  | NO   | MUL | NULL              |                   |
| pertemuan_ke | int          | NO   |     | NULL              |                   |
| tanggal      | date         | NO   |     | NULL              |                   |
| topik        | varchar(255) | YES  |     | NULL              |                   |
| deskripsi    | text         | YES  |     | NULL              |                   |
| created_at   | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+--------------+--------------+------+-----+-------------------+-------------------+
7 rows in set (0.00 sec)

mysql> desc pinned_conversations;
+-----------------+-----------+------+-----+-------------------+-------------------+
| Field           | Type      | Null | Key | Default           | Extra             |
+-----------------+-----------+------+-----+-------------------+-------------------+
| id              | int       | NO   | PRI | NULL              | auto_increment    |
| user_id         | int       | NO   | MUL | NULL              |                   |
| conversation_id | int       | NO   | MUL | NULL              |                   |
| created_at      | timestamp | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-----------------+-----------+------+-----+-------------------+-------------------+
4 rows in set (0.00 sec)

mysql> desc post_engagements;
+-----------------+-----------+------+-----+-------------------+-----------------------------------------------+
| Field           | Type      | Null | Key | Default           | Extra                                         |
+-----------------+-----------+------+-----+-------------------+-----------------------------------------------+
| id              | int       | NO   | PRI | NULL              | auto_increment                                |
| post_id         | int       | NO   | MUL | NULL              |                                               |
| impressions     | int       | YES  |     | 0                 |                                               |
| clicks          | int       | YES  |     | 0                 |                                               |
| engagement_rate | float     | YES  |     | 0                 |                                               |
| created_at      | timestamp | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at      | timestamp | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+-----------------+-----------+------+-----+-------------------+-----------------------------------------------+
7 rows in set (0.00 sec)

mysql> desc posts;
+-----------------+-------------------------------------------------------------+------+-----+-------------------+-----------------------------------------------+
| Field           | Type                                                        | Null | Key | Default           | Extra                                         |
+-----------------+-------------------------------------------------------------+------+-----+-------------------+-----------------------------------------------+
| id              | int                                                         | NO   | PRI | NULL              | auto_increment                                |
| user_id         | int                                                         | NO   | MUL | NULL              |                                               |
| role            | enum('admin','dosen','mahasiswa','ormawa','ukm','orangtua') | NO   | MUL | NULL              |                                               |
| title           | varchar(255)                                                | NO   |     | NULL              |                                               |
| content         | text                                                        | NO   |     | NULL              |                                               |
| media_url       | varchar(255)                                                | YES  |     | NULL              |                                               |
| created_at      | timestamp                                                   | YES  | MUL | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at      | timestamp                                                   | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at      | timestamp                                                   | YES  |     | NULL              |                                               |
| author_name     | varchar(255)                                                | NO   |     | Unknown           |                                               |
| likes_count     | int                                                         | YES  |     | 0                 |                                               |
| comments_count  | int                                                         | YES  |     | 0                 |                                               |
| author_username | varchar(100)                                                | YES  |     | NULL              |                                               |
+-----------------+-------------------------------------------------------------+------+-----+-------------------+-----------------------------------------------+
13 rows in set (0.00 sec)

mysql> desc riwayat_pembayaran;
+------------------+------------------------------------+------+-----+-------------------+-----------------------------------------------+
| Field            | Type                               | Null | Key | Default           | Extra                                         |
+------------------+------------------------------------+------+-----+-------------------+-----------------------------------------------+
| id               | int                                | NO   | PRI | NULL              | auto_increment                                |
| mahasiswa_id     | int                                | NO   | MUL | NULL              |                                               |
| invoice_uuid     | varchar(255)                       | NO   | UNI | NULL              |                                               |
| metode           | enum('qris','transfer')            | NO   |     | NULL              |                                               |
| payment_method   | varchar(50)                        | YES  | MUL | NULL              |                                               |
| nominal          | decimal(15,2)                      | NO   |     | NULL              |                                               |
| biaya_admin      | decimal(15,2)                      | NO   |     | 0.00              |                                               |
| total_dibayar    | decimal(15,2)                      | NO   |     | NULL              |                                               |
| payment_number   | text                               | YES  |     | NULL              |                                               |
| pakasir_order_id | varchar(255)                       | YES  | MUL | NULL              |                                               |
| status           | enum('pending','success','failed') | YES  | MUL | pending           |                                               |
| tanggal          | timestamp                          | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| expired_at       | datetime                           | YES  |     | NULL              |                                               |
| invoice_url      | text                               | YES  |     | NULL              |                                               |
| created_at       | timestamp                          | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at       | timestamp                          | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+------------------+------------------------------------+------+-----+-------------------+-----------------------------------------------+
16 rows in set (0.00 sec)

mysql> desc saved_posts;
+------------+-------------+------+-----+-------------------+-----------------------------------------------+
| Field      | Type        | Null | Key | Default           | Extra                                         |
+------------+-------------+------+-----+-------------------+-----------------------------------------------+
| id         | int         | NO   | PRI | NULL              | auto_increment                                |
| post_id    | int         | NO   | MUL | NULL              |                                               |
| user_id    | int         | NO   | MUL | NULL              |                                               |
| user_role  | varchar(50) | NO   |     | NULL              |                                               |
| created_at | timestamp   | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at | timestamp   | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at | timestamp   | YES  |     | NULL              |                                               |
+------------+-------------+------+-----+-------------------+-----------------------------------------------+
7 rows in set (0.00 sec)

mysql> desc schedule;
+------------------+----------------------------------------------------------------+------+-----+---------+----------------+
| Field            | Type                                                           | Null | Key | Default | Extra          |
+------------------+----------------------------------------------------------------+------+-----+---------+----------------+
| id               | int                                                            | NO   | PRI | NULL    | auto_increment |
| mata_kuliah_kode | varchar(10)                                                    | NO   | MUL | NULL    |                |
| hari             | enum('senin','selasa','rabu','kamis','jumat','sabtu','minggu') | YES  |     | NULL    |                |
| jam_mulai        | time                                                           | NO   |     | NULL    |                |
| jam_selesai      | time                                                           | NO   |     | NULL    |                |
| ruangan          | varchar(50)                                                    | YES  |     | NULL    |                |
+------------------+----------------------------------------------------------------+------+-----+---------+----------------+
6 rows in set (0.00 sec)

mysql> desc submissions;
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field       | Type         | Null | Key | Default           | Extra                                         |
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
| id          | int          | NO   | PRI | NULL              | auto_increment                                |
| task_id     | int          | NO   | MUL | NULL              |                                               |
| student_id  | int          | NO   | MUL | NULL              |                                               |
| file_url    | varchar(255) | YES  |     | NULL              |                                               |
| answer_text | text         | YES  |     | NULL              |                                               |
| grade       | decimal(5,2) | YES  |     | NULL              |                                               |
| created_at  | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at  | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at  | timestamp    | YES  |     | NULL              |                                               |
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
9 rows in set (0.00 sec)

mysql> desc tugas;
+-------------+------------------------+------+-----+-------------------+-----------------------------------------------+
| Field       | Type                   | Null | Key | Default           | Extra                                         |
+-------------+------------------------+------+-----+-------------------+-----------------------------------------------+
| id          | int                    | NO   | PRI | NULL              | auto_increment                                |
| course_id   | varchar(100)           | NO   |     | NULL              |                                               |
| pertemuan   | int                    | NO   |     | 1                 |                                               |
| title       | varchar(255)           | NO   |     | NULL              |                                               |
| description | text                   | YES  |     | NULL              |                                               |
| file_tugas  | varchar(255)           | YES  |     | NULL              |                                               |
| due_date    | datetime               | YES  |     | NULL              |                                               |
| created_at  | timestamp              | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at  | timestamp              | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at  | timestamp              | YES  |     | NULL              |                                               |
| type        | enum('materi','tugas') | YES  |     | tugas             |                                               |
+-------------+------------------------+------+-----+-------------------+-----------------------------------------------+
11 rows in set (0.00 sec)

mysql> desc ukm;
+-----------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field           | Type         | Null | Key | Default           | Extra                                         |
+-----------------+--------------+------+-----+-------------------+-----------------------------------------------+
| id              | int          | NO   | PRI | NULL              | auto_increment                                |
| user_id         | int          | NO   | MUL | NULL              |                                               |
| name            | varchar(255) | NO   |     | NULL              |                                               |
| created_at      | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at      | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at      | timestamp    | YES  |     | NULL              |                                               |
| username        | varchar(100) | YES  | UNI | NULL              |                                               |
| bio             | text         | YES  |     | NULL              |                                               |
| website         | varchar(255) | YES  |     | NULL              |                                               |
| phone           | varchar(20)  | YES  |     | NULL              |                                               |
| profile_picture | varchar(255) | YES  |     | NULL              |                                               |
| followers_count | int          | YES  |     | 0                 |                                               |
| following_count | int          | YES  |     | 0                 |                                               |
+-----------------+--------------+------+-----+-------------------+-----------------------------------------------+
13 rows in set (0.00 sec)

mysql> desc ukt_invoices;
+----------------+------------------------------------+------+-----+-------------------+-----------------------------------------------+
| Field          | Type                               | Null | Key | Default           | Extra                                         |
+----------------+------------------------------------+------+-----+-------------------+-----------------------------------------------+
| id             | int                                | NO   | PRI | NULL              | auto_increment                                |
| student_id     | int                                | NO   | MUL | NULL              |                                               |
| amount         | decimal(10,2)                      | NO   |     | NULL              |                                               |
| uuid           | varchar(255)                       | NO   | UNI | NULL              |                                               |
| status         | enum('pending','paid','cancelled') | YES  |     | pending           |                                               |
| payment_method | varchar(50)                        | YES  |     | NULL              |                                               |
| completed_at   | timestamp                          | YES  |     | NULL              |                                               |
| created_at     | timestamp                          | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| expired_at     | datetime                           | YES  |     | NULL              |                                               |
| updated_at     | timestamp                          | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at     | timestamp                          | YES  |     | NULL              |                                               |
+----------------+------------------------------------+------+-----+-------------------+-----------------------------------------------+
11 rows in set (0.00 sec)

mysql> desc users;
+------------+-------------------------------------------------------------+------+-----+-------------------+-----------------------------------------------+
| Field      | Type                                                        | Null | Key | Default           | Extra                                         |
+------------+-------------------------------------------------------------+------+-----+-------------------+-----------------------------------------------+
| id         | int                                                         | NO   | PRI | NULL              | auto_increment                                |
| email      | varchar(255)                                                | NO   | UNI | NULL              |                                               |
| password   | varchar(255)                                                | NO   |     | NULL              |                                               |
| role       | enum('admin','dosen','mahasiswa','orangtua','ukm','ormawa') | NO   |     | NULL              |                                               |
| created_at | timestamp                                                   | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at | timestamp                                                   | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| deleted_at | timestamp                                                   | YES  |     | NULL              |                                               |
+------------+-------------------------------------------------------------+------+-----+-------------------+-----------------------------------------------+
7 rows in set (0.00 sec)

mysql> desc webhook_logs;
+------------+--------------+------+-----+-------------------+-------------------+
| Field      | Type         | Null | Key | Default           | Extra             |
+------------+--------------+------+-----+-------------------+-------------------+
| id         | int          | NO   | PRI | NULL              | auto_increment    |
| order_id   | varchar(255) | NO   | MUL | NULL              |                   |
| status     | varchar(50)  | NO   | MUL | NULL              |                   |
| amount     | bigint       | NO   |     | NULL              |                   |
| payload    | text         | YES  |     | NULL              |                   |
| created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+--------------+------+-----+-------------------+-------------------+
6 rows in set (0.00 sec)

mysql> desc webhook_test;
+------------+--------------+------+-----+-------------------+-------------------+
| Field      | Type         | Null | Key | Default           | Extra             |
+------------+--------------+------+-----+-------------------+-------------------+
| id         | int          | NO   | PRI | NULL              | auto_increment    |
| order_id   | varchar(255) | NO   |     | NULL              |                   |
| status     | varchar(50)  | NO   |     | NULL              |                   |
| amount     | bigint       | NO   |     | NULL              |                   |
| created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+--------------+------+-----+-------------------+-------------------+
5 rows in set (0.00 sec)

mysql>