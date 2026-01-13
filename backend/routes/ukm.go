package routes

import (
	"nf-student-hub-backend/controllers"
	"nf-student-hub-backend/middlewares"

	"github.com/gin-gonic/gin"
)

func UKMRoutes(r *gin.RouterGroup) {
	ukm := r.Group("/ukm")
	ukm.Use(middlewares.JWTMiddleware(), middlewares.RoleMiddleware("ukm"))
	{
		ukm.GET("/posts", controllers.GetUKMPosts)
		ukm.POST("/posts", controllers.CreateUKMPost)
		ukm.GET("/stats", controllers.GetUKMStats)
	}
}
