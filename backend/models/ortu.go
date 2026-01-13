package models

import (
	"database/sql"
	"time"
)

type Ortu struct {
	ID        int          `json:"id"`
	UserID    int          `json:"user_id"`
	Name      string       `json:"name"`
	Alamat    string       `json:"alamat"`
	ChildID   int          `json:"child_id"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `json:"deleted_at,omitempty"`
}