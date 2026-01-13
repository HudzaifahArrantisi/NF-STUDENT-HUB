package routes

import (
	"nf-student-hub-backend/controllers"
	"nf-student-hub-backend/middlewares"

	"github.com/gin-gonic/gin"
)

func FeedRoutes(r *gin.RouterGroup) {
	feed := r.Group("/feed")
	feed.Use(middlewares.JWTMiddleware())
	{
		feed.GET("", controllers.GetFeed)
		feed.POST("", controllers.CreatePost)
		feed.GET("/:id", controllers.GetPost)
		feed.POST("/:id/like", controllers.LikePost)
		feed.POST("/:id/comment", controllers.CommentPost)
	}
}