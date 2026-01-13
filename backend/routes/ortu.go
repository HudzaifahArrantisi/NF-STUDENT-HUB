package routes

import (
	"nf-student-hub-backend/controllers"
	"nf-student-hub-backend/middlewares"

	"github.com/gin-gonic/gin"
)

func OrtuRoutes(r *gin.RouterGroup) {
	ortu := r.Group("/ortu")
	ortu.Use(middlewares.JWTMiddleware(), middlewares.RoleMiddleware("orangtua"))
	{
		ortu.GET("/child/:student_id/attendance", controllers.GetChildAttendance)
		ortu.POST("/ukt/pay", controllers.PayChildInvoice)
	}
}


