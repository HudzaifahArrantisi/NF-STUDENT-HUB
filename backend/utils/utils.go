package utils

import (
	"crypto/rand"
	"encoding/hex"
	mathrand "math/rand"
	"time"
)

// GenerateRandomString menghasilkan string acak aman untuk token
func GenerateRandomString(length int) string {
	bytes := make([]byte, length)

	// Coba pakai crypto/rand terlebih dahulu (aman)
	_, err := rand.Read(bytes)
	if err == nil {
		return hex.EncodeToString(bytes)[:length]
	}

	// Fallback ke versi lama (math/rand)
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	r := mathrand.New(mathrand.NewSource(time.Now().UnixNano()))

	fallback := make([]byte, length)
	for i := range fallback {
		fallback[i] = charset[r.Intn(len(charset))]
	}

	return string(fallback)
}
