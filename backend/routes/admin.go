	package routes

	import (
		"nf-student-hub-backend/controllers"
		"nf-student-hub-backend/middlewares"

		"github.com/gin-gonic/gin"
	)

	func AdminRoutes(r *gin.RouterGroup) {
		admin := r.Group("/admin")
		admin.Use(middlewares.JWTMiddleware(), middlewares.RoleMiddleware("admin"))
		{
			admin.GET("/ukt/unpaid", controllers.GetUnpaidInvoices)
			admin.POST("/posts", controllers.CreateAdminPost)
		}
	}