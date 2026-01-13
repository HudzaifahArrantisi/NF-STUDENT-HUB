package middlewares

import (
	"net/http"
	"strings"

	"nf-student-hub-backend/utils"

	"github.com/gin-gonic/gin"
)

// WebSocketAuthMiddleware authenticates WebSocket connections
func WebSocketAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get token from query parameter or header
		tokenString := c.Query("token")
		if tokenString == "" {
			authHeader := c.GetHeader("Authorization")
			if authHeader != "" {
				parts := strings.Split(authHeader, " ")
				if len(parts) == 2 && parts[0] == "Bearer" {
					tokenString = parts[1]
				}
			}
		}

		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token tidak ditemukan"})
			c.Abort()
			return
		}

		// Validate token
		claims, err := utils.ValidateToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token tidak valid"})
			c.Abort()
			return
		}

		// Set user information in context
		c.Set("user_id", claims.UserID)
		c.Set("user_role", claims.Role)
		c.Set("username", claims.Username)

		c.Next()
	}
}
