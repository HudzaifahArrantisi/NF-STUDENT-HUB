package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// DB keeps the original *sql.DB for existing code that uses Query/Exec
var DB *sql.DB

// GormDB is the GORM *gorm.DB instance for ORM usage
var GormDB *gorm.DB

// InitDB initializes both *sql.DB and *gorm.DB connections using MySQL
func InitDB() {
	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		dsn = "root:@tcp(127.0.0.1:3306)/nf_student_hub3?parseTime=true"
	}

	// Initialize GORM
	gdb, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	if err != nil {
		log.Fatalf("Failed to connect to database (gorm): %v", err)
	}

	// Retrieve underlying sql.DB
	sqlDB, err := gdb.DB()
	if err != nil {
		log.Fatalf("Failed to get underlying sql.DB: %v", err)
	}

	// Ping to verify
	if err := sqlDB.Ping(); err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}

	// assign package variables
	GormDB = gdb
	DB = sqlDB

	fmt.Println("Database connected successfully")
}
