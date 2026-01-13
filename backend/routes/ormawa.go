package routes

import (
	"nf-student-hub-backend/controllers"
	"nf-student-hub-backend/middlewares"

	"github.com/gin-gonic/gin"
)

func OrmawaRoutes(r *gin.RouterGroup) {
	ormawa := r.Group("/ormawa")
	ormawa.Use(middlewares.JWTMiddleware(), middlewares.RoleMiddleware("ormawa"))
	{
		ormawa.GET("/posts", controllers.GetOrmawaPosts)
		ormawa.POST("/posts", controllers.CreateOrmawaPost)
	}
}