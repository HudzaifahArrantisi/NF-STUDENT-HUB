package models

import (
	"database/sql"
	"time"
)

type Post struct {
	ID        int          `json:"id"`
	UserID    int          `json:"user_id"`
	Role      string       `json:"role"`
	Title     string       `json:"title"`
	Content   string       `json:"content"`
	MediaURL  string       `json:"media_url"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `json:"deleted_at,omitempty"`
}

type Like struct {
	ID        int          `json:"id"`
	PostID    int          `json:"post_id"`
	UserID    int          `json:"user_id"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `json:"deleted_at,omitempty"`
}

type Comment struct {
	ID        int          `json:"id"`
	PostID    int          `json:"post_id"`
	UserID    int          `json:"user_id"`
	Content   string       `json:"content"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `json:"deleted_at,omitempty"`
}