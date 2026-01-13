package utils

import (
	"crypto/rand"
	"encoding/hex"
	"time"
)

type QRSession struct {
	SessionID   string
	TeacherID   int
	CourseID    string
	CreatedAt   time.Time
	ExpiresAt   time.Time
	Validated   bool
}

var qrSessions = make(map[string]*QRSession)

func CreateSession(teacherID int, courseID string) (string, string) {
	sessionID := generateRandomString(16)
	qrPayload := generateRandomString(32)

	qrSessions[sessionID] = &QRSession{
		SessionID: sessionID,
		TeacherID: teacherID,
		CourseID:  courseID,
		CreatedAt: time.Now(),
		ExpiresAt: time.Now().Add(10 * time.Minute),
		Validated: false,
	}

	return sessionID, qrPayload
}

func ValidateScan(sessionID, studentCode string) bool {
	session, exists := qrSessions[sessionID]
	if !exists {
		return false
	}

	// Check if session is still valid (not expired)
	if time.Now().After(session.ExpiresAt) {
		delete(qrSessions, sessionID)
		return false
	}

	// In a real implementation, you would validate the student code
	// For now, we'll just return true if the session exists and is valid
	session.Validated = true
	return true
}

func generateRandomString(length int) string {
	bytes := make([]byte, length/2)
	if _, err := rand.Read(bytes); err != nil {
		panic(err)
	}
	return hex.EncodeToString(bytes)
}