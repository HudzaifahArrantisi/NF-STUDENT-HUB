package models

import (
	"database/sql"
	"time"
)

type Dosen struct {
	ID        int          `json:"id"`
	UserID    int          `json:"user_id"`
	Name      string       `json:"name"`
	NIP       string       `json:"nip"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `json:"deleted_at,omitempty"`
}

// Relation to User for convenience
func (Dosen) TableName() string { return "dosen" }

// Add User relation
type DosenWithUser struct {
	Dosen
	User User `json:"user" gorm:"foreignKey:UserID"`
}

type Tugas struct {
	ID        int          `json:"id"`
	CourseID  string       `json:"course_id"`
	Title     string       `json:"title"`
	Desc      string       `json:"desc"`
	DueDate   time.Time    `json:"due_date"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `json:"deleted_at,omitempty"`
}

type Submission struct {
	ID        int          `json:"id"`
	TaskID    int          `json:"task_id"`
	StudentID int          `json:"student_id"`
	FileURL   string       `json:"file_url"`
	Grade     *float64     `json:"grade"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `json:"deleted_at,omitempty"`
}