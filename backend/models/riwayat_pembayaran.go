package models

import (
	"database/sql"
	"time"
)

type RiwayatPembayaran struct {
	ID           int          `json:"id"`
	MahasiswaID  int          `json:"mahasiswa_id"`
	InvoiceUUID  string       `json:"invoice_uuid"`
	Metode       string       `json:"metode"`
	Nominal      float64      `json:"nominal"`
	BiayaAdmin   float64      `json:"biaya_admin"`
	TotalDibayar float64      `json:"total_dibayar"`
	Status       string       `json:"status"`
	Tanggal      time.Time    `json:"tanggal"`
	CreatedAt    time.Time    `json:"created_at"`
	UpdatedAt    time.Time    `json:"updated_at"`
	DeletedAt    sql.NullTime `json:"deleted_at,omitempty"`
}