package utils

import (
	"crypto/rand"
	"encoding/hex"
)

type PaymentInvoice struct {
	UUID    string
	StudentID int
	Amount  float64
	Status  string
}

var paymentInvoices = make(map[string]*PaymentInvoice)

func CreateInvoice(studentID int, amount float64) string {
	uuid := generateUUID()
	paymentInvoices[uuid] = &PaymentInvoice{
		UUID:      uuid,
		StudentID: studentID,
		Amount:    amount,
		Status:    "pending",
	}
	return uuid
}

func SimulatePayment(invoiceUUID string) bool {
	invoice, exists := paymentInvoices[invoiceUUID]
	if !exists {
		return false
	}

	if invoice.Status == "pending" {
		invoice.Status = "paid"
		return true
	}

	return false
}

func GetInvoiceStatus(invoiceUUID string) string {
	invoice, exists := paymentInvoices[invoiceUUID]
	if !exists {
		return "not_found"
	}
	return invoice.Status
}

func generateUUID() string {
	bytes := make([]byte, 16)
	if _, err := rand.Read(bytes); err != nil {
		panic(err)
	}
	// Set version 4 (random UUID)
	bytes[6] = (bytes[6] & 0x0f) | 0x40
	// Set variant (RFC 4122)
	bytes[8] = (bytes[8] & 0x3f) | 0x80
	return hex.EncodeToString(bytes)
}