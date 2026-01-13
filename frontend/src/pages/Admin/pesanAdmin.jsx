import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import useAuth from '../../hooks/useAuth'
import Sidebar from '../../components/Sidebar'

const ChatAdmin = () => {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatStats, setChatStats] = useState(null)
  const [recentMessages, setRecentMessages] = useState([])
  const [activeGroups, setActiveGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadChatStats()
    loadRecentMessages()
    loadActiveGroups()
  }, [])

  const loadChatStats = async () => {
    try {
      const response = await api.getChatStats()
      if (response.data.success) {
        setChatStats(response.data.data)
      }
    } catch (error) {
      console.error('Error loading chat stats:', error)
    }
  }

  const loadRecentMessages = async () => {
    try {
      const response = await api.getConversations()
      if (response.data.success) {
        // Get conversations with recent messages
        const conversationsWithMessages = response.data.data
          .filter(conv => conv.last_message)
          .sort((a, b) => new Date(b.last_message.created_at) - new Date(a.last_message.created_at))
          .slice(0, 5)
        
        setRecentMessages(conversationsWithMessages)
      }
    } catch (error) {
      console.error('Error loading recent messages:', error)
    }
  }

  const loadActiveGroups = async () => {
    try {
      const response = await api.getMatkulGroups()
      if (response.data.success) {
        setActiveGroups(response.data.data || [])
      }
    } catch (error) {
      console.error('Error loading active groups:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" isOpen={sidebarOpen} onClose={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0 transition-all duration-300 min-w-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 lg:mb-8">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="text-xl">☰</span>
            </button>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Chat Admin</h1>
              <p className="text-gray-600 mt-2">Monitor dan kelola sistem chat seluruh pengguna</p>
            </div>
            <Link
              to="/chat"
              className="btn btn-primary flex items-center gap-2"
            >
              <i className="fas fa-comments"></i>
              Buka Chat
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-comments text-blue-500 text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Percakapan</p>
                  <p className="text-2xl font-bold">{chatStats?.total_conversations || 0}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-envelope text-green-500 text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Pesan</p>
                  <p className="text-2xl font-bold">{chatStats?.total_messages || 0}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-bell text-yellow-500 text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pesan Belum Dibaca</p>
                  <p className="text-2xl font-bold">{chatStats?.unread_messages || 0}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-users text-purple-500 text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Grup Aktif</p>
                  <p className="text-2xl font-bold">{chatStats?.group_chats || 0}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Messages */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">Pesan Terbaru</h3>
                <p className="text-gray-600 text-sm mt-1">Pesan terbaru dari semua percakapan</p>
              </div>
              <div className="p-2">
                {recentMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-comment-slash text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500">Belum ada pesan terbaru</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recentMessages.map(conv => (
                      <Link
                        key={conv.id}
                        to={`/chat/${conv.id}`}
                        className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              {conv.type === 'group' ? (
                                <i className="fas fa-users text-blue-500"></i>
                              ) : conv.mata_kuliah ? (
                                <i className="fas fa-book text-green-500"></i>
                              ) : (
                                <i className="fas fa-user text-gray-500"></i>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-gray-900 truncate">
                                {conv.name}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {formatTime(conv.last_message.created_at)}
                              </span>
                            </div>
                            
                            <p className="text-sm text-gray-600 truncate mt-1">
                              <span className="font-medium">
                                {conv.last_message.sender.id === user.id ? 'Anda' : conv.last_message.sender.name}:
                              </span>{' '}
                              {conv.last_message.content}
                            </p>
                            
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                conv.type === 'group' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {conv.type === 'group' ? 'Grup' : 'Privat'}
                              </span>
                              
                              {conv.unread_count > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                  {conv.unread_count}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <Link
                  to="/chat"
                  className="btn btn-outline w-full flex items-center justify-center gap-2"
                >
                  <i className="fas fa-comments"></i>
                  Lihat Semua Percakapan
                </Link>
              </div>
            </div>

            {/* Active Groups */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">Grup Mata Kuliah Aktif</h3>
                <p className="text-gray-600 text-sm mt-1">Grup chat berdasarkan mata kuliah</p>
              </div>
              <div className="p-2">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Memuat grup...</p>
                  </div>
                ) : activeGroups.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-users-slash text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500">Belum ada grup aktif</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {activeGroups.map(group => (
                      <Link
                        key={group.id}
                        to={`/chat/${group.conversation_id}`}
                        className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <i className="fas fa-book text-green-500"></i>
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-gray-900">
                                {group.mata_kuliah?.nama || 'Mata Kuliah'}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {new Date(group.created_at).toLocaleDateString('id-ID')}
                              </span>
                            </div>
                            
                            <p className="text-sm text-gray-600 truncate">
                              Kode: {group.mata_kuliah?.kode || 'N/A'}
                            </p>
                            
                            <div className="flex items-center gap-2 mt-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                Dosen: {group.creator?.name || 'N/A'}
                              </span>
                              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                ID: {group.conversation_id}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => loadActiveGroups()}
                  className="btn btn-outline w-full flex items-center justify-center gap-2"
                >
                  <i className="fas fa-sync-alt"></i>
                  Refresh Data
                </button>
              </div>
            </div>
          </div>

          {/* Admin Tools */}
          <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">Alat Administrasi</h3>
              <p className="text-gray-600 text-sm mt-1">Alat untuk mengelola sistem chat</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    // Navigate to user management for chat
                  }}
                  className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-user-cog text-blue-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Kelola Pengguna</h4>
                      <p className="text-sm text-gray-600">Kelola akses dan izin chat</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    // Navigate to chat logs
                  }}
                  className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-history text-green-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Log Chat</h4>
                      <p className="text-sm text-gray-600">Lihat riwayat percakapan</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    // Navigate to system settings
                  }}
                  className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-cogs text-purple-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Pengaturan Sistem</h4>
                      <p className="text-sm text-gray-600">Konfigurasi sistem chat</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatAdmin