// src/services/postInteractions.js
import api from './api'

export const postInteractions = {
  // Like a post
  likePost: (postId) => 
    api.post(`/api/posts/${postId}/like`),
  
  // Unlike a post
  unlikePost: (postId) => 
    api.post(`/api/posts/${postId}/unlike`),
  
  // Add comment
  addComment: (postId, content) => 
    api.post(`/api/posts/${postId}/comments`, { content }),
  
  // Save post
  savePost: (postId) => 
    api.post(`/api/posts/${postId}/save`),
  
  // Unsave post
  unsavePost: (postId) => 
    api.post(`/api/posts/${postId}/unsave`),
  
  // Get post comments
  getComments: (postId) => 
    api.get(`/api/posts/${postId}/comments`),
  
  // Delete comment
  deleteComment: (postId, commentId) => 
    api.delete(`/api/posts/${postId}/comments/${commentId}`)
}