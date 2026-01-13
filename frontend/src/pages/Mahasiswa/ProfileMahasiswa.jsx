import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import useAuth from '../../hooks/useAuth'
import { FaCamera, FaSave, FaMapMarkerAlt, FaIdCard, FaEnvelope, FaUser, FaEdit } from 'react-icons/fa'
import { getProfilePhotoUrl } from '../../utils/profileUtils'

const ProfileMahasiswa = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  const { data: profile, isLoading, error: profileError } = useQuery({
    queryKey: ['mahasiswaProfile'],
    queryFn: () => api.get('/api/mahasiswa/profile').then(res => res.data.data),
    staleTime: 5 * 60 * 1000,
  })

  const [formData, setFormData] = useState({
    alamat: '',
    photo: null
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        alamat: profile.alamat || '',
        photo: null
      })
    }
  }, [profile])

  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      const formDataToSend = new FormData()
      formDataToSend.append('name', profile.name)
      formDataToSend.append('nim', profile.nim)
      formDataToSend.append('alamat', data.alamat)
      
      if (data.photo) {
        formDataToSend.append('photo', data.photo)
      }

      const response = await api.put('/api/mahasiswa/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mahasiswaProfile'] })
      setIsEditing(false)
      setPreviewImage(null)
    }
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File terlalu besar. Maksimal 5MB')
        return
      }

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
      if (!validTypes.includes(file.type)) {
        alert('Format file tidak didukung. Gunakan JPG, JPEG, PNG, atau GIF')
        return
      }

      setFormData({
        ...formData,
        photo: file
      })

      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.alamat.trim() && !formData.photo) {
      alert('Harap isi alamat atau pilih foto untuk diupdate')
      return
    }

    updateProfileMutation.mutate(formData)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setPreviewImage(null)
    if (profile) {
      setFormData({
        alamat: profile.alamat || '',
        photo: null
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Sidebar role="mahasiswa" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar user={user} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat profil...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const displayPhoto = previewImage || (profile?.photo ? getProfilePhotoUrl(profile.photo) : null)

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar role="mahasiswa" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 md:p-8 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center overflow-hidden">
                        {displayPhoto ? (
                          <img 
                            src={displayPhoto} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaUser className="text-3xl text-white/70" />
                        )}
                      </div>
                      
                      {isEditing && (
                        <label className="
                          absolute bottom-0 right-0 bg-white text-blue-600 
                          rounded-full p-2 shadow-lg cursor-pointer 
                          hover:bg-gray-100 transition-all duration-300
                          transform hover:scale-110
                        ">
                          <FaCamera className="text-sm" />
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                      )}
                    </div>

                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold">{profile?.name}</h1>
                      <p className="text-blue-100 text-lg">{profile?.nim}</p>
                      <p className="text-blue-100 text-sm mt-1">{profile?.email}</p>
                    </div>
                  </div>

                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="
                        bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold 
                        hover:bg-blue-50 transform hover:scale-105
                        transition-all duration-300 shadow-lg hover:shadow-xl
                        flex items-center space-x-2 w-full md:w-auto justify-center
                      "
                    >
                      <FaEdit />
                      <span>Edit Profil</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6 md:p-8">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Readonly Fields */}
                      {[
                        { label: 'Nama Lengkap', value: profile?.name, icon: FaUser, color: 'blue' },
                        { label: 'NIM', value: profile?.nim, icon: FaIdCard, color: 'green' },
                        { label: 'Email', value: profile?.email, icon: FaEnvelope, color: 'purple' },
                      ].map((field, index) => (
                        <div key={index}>
                          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                            <field.icon className={`text-${field.color}-500`} />
                            <span>{field.label}</span>
                          </label>
                          <input
                            type="text"
                            value={field.value || ''}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                            readOnly
                            disabled
                          />
                          <p className="text-xs text-gray-500 mt-1">Tidak dapat diubah</p>
                        </div>
                      ))}

                      {/* Photo Upload */}
                      <div>
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                          <FaCamera className="text-orange-500" />
                          <span>Foto Profil</span>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                    </div>

                    {/* Alamat Field */}
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span>Alamat</span>
                      </label>
                      <textarea
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Masukkan alamat lengkap..."
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                      <button
                        type="submit"
                        disabled={updateProfileMutation.isLoading}
                        className="
                          flex items-center space-x-2 bg-blue-600 text-white 
                          px-6 py-3 rounded-xl font-semibold 
                          hover:bg-blue-700 transform hover:scale-105
                          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                          transition-all duration-300 shadow-lg hover:shadow-xl
                          justify-center
                        "
                      >
                        <FaSave />
                        <span>
                          {updateProfileMutation.isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="
                          px-6 py-3 border border-gray-300 text-gray-700 
                          rounded-xl font-semibold hover:bg-gray-50 
                          transition-all duration-300
                        "
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Info Cards */}
                      {[
                        { label: 'Nama Lengkap', value: profile?.name, icon: FaUser, color: 'blue' },
                        { label: 'NIM', value: profile?.nim, icon: FaIdCard, color: 'green' },
                        { label: 'Email', value: profile?.email, icon: FaEnvelope, color: 'purple' },
                        { label: 'Alamat', value: profile?.alamat || 'Belum diisi', icon: FaMapMarkerAlt, color: 'orange' },
                      ].map((field, index) => (
                        <div 
                          key={index}
                          className="
                            flex items-center space-x-4 p-4 
                            bg-gray-50 rounded-xl border border-gray-200
                            hover:shadow-md transition-all duration-300
                          "
                        >
                          <div className={`w-12 h-12 bg-${field.color}-100 rounded-xl flex items-center justify-center`}>
                            <field.icon className={`text-${field.color}-500 text-xl`} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">{field.label}</p>
                            <p className="font-semibold text-gray-800">{field.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProfileMahasiswa