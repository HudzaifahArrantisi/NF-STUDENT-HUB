package models

import (
	"database/sql"
	"time"
)

// Minimal MataKuliah model to support chat relations
type MataKuliah struct {
	ID      int    `json:"id"`
	Kode    string `json:"kode"`
	Nama    string `json:"nama"`
	SKS     int    `json:"sks"`
	DosenID *int   `json:"dosen_id,omitempty"`
	// Relation to Dosen (with User) for preloads used by controllers
	Dosen     *DosenWithUser `json:"dosen,omitempty" gorm:"foreignKey:DosenID"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt sql.NullTime   `json:"deleted_at,omitempty"`
}

// MahasiswaMataKuliah maps mahasiswa to mata_kuliah (enrollment)
type MahasiswaMataKuliah struct {
	ID           int       `json:"id"`
	MahasiswaID  int       `json:"mahasiswa_id"`
	MataKuliahID int       `json:"mata_kuliah_id"`
	CreatedAt    time.Time `json:"created_at"`
}
