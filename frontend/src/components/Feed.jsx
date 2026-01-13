// components/Feed.jsx - DIUPDATE UNTUK PUSAT
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import api from '../services/api'
import PostCard from './PostCard'

const getRelativeTime = (dateString) => {
  const rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' })
  const now = Date.now()
  const postDate = new Date(dateString).getTime()
  const diffInSeconds = Math.floor((now - postDate) / 1000)

  if (diffInSeconds < 60) return 'baru saja'
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return rtf.format(-diffInMinutes, 'minute')
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return rtf.format(-diffInHours, 'hour')
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return rtf.format(-diffInDays, 'day')
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const Feed = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['feed'],
    queryFn: () => api.get('/api/feed').then(res => res.data.data || []),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
      <p className="text-gray-500 font-medium">Memuat postingan...</p>
    </div>
  )
  
  if (error) return (
    <div className="text-center py-8 text-red-500 animate-fadeIn">
      Error loading feed: {error.message}
    </div>
  )

  return (
    <div className="feed-container font-sans">
      {posts?.map(post => (
        <PostCard key={post.id} post={post} getRelativeTime={getRelativeTime} />
      ))}
      {(!posts || posts.length === 0) && !isLoading && (
        <div className="text-center py-12 text-gray-500 animate-fadeIn">
          <div className="text-4xl mb-3 opacity-50">📝</div>
          <p className="text-lg font-medium text-gray-700">Belum ada postingan</p>
          <p className="text-sm mt-1 text-gray-500">Jadilah yang pertama untuk posting!</p>
        </div>
      )}
    </div>
  )
}

export default Feed