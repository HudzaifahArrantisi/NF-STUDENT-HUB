package middlewares

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func RoleMiddleware(allowedRoles ...string) gin.HandlerFunc {
    return func(c *gin.Context) {
        role, exists := c.Get("role")
        if !exists {
            c.JSON(http.StatusForbidden, gin.H{
                "success": false,
                "message": "No role found",
            })
            c.Abort()
            return
        }

        // Check if user role is in allowed roles
        isValid := false
        for _, allowedRole := range allowedRoles {
            if role == allowedRole {
                isValid = true
                break
            }
        }

        if !isValid {
            c.JSON(http.StatusForbidden, gin.H{
                "success": false,
                "message": "Insufficient permissions",
            })
            c.Abort()
            return
        }

        

        c.Next()
    }
}
