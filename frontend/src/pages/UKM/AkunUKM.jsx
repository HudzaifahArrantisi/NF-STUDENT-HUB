// src/pages/UKM/AkunUKM.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import useProfile from '../../hooks/useProfile'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import useAuth from '../../hooks/useAuth'

const AkunUKM = () => {
  const { user } = useAuth()
  const { data: profile, isLoading } = useProfile()

  if (isLoading) return <div className="p-20 text-center">Loading profile...</div>

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="ukm" />
      <div className="flex-1 max-w-5xl mx-auto p-8">

        <Navbar user={user} />

        <div className="bg-white rounded-2xl shadow-xl p-10 mb-8">
          <div className="flex flex-col md:flex-row gap-10">
            <div>
              {profile?.profile_picture ? (
                <img src={`http://localhost:8080${profile.profile_picture}`} className="w-48 h-48 rounded-full object-cover border-8 border-orange-500" />
              ) : (
                <div className="w-48 h-48 rounded-full bg-gradient-to-r from-orange-500 to-orange-700 flex-center text-white text-7xl font-bold">
                  {profile?.name?.[0] || 'U'}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-3">{profile?.name}</h1>
              <p className="text-2xl text-gray-600 mb-6">@{profile?.username}</p>

              {profile?.bio && <p className="text-xl mb-8 leading-relaxed">{profile.bio}</p>}

              <div className="grid grid-cols-3 gap-10 text-center mb-8">
                <div>
                  <div className="text-4xl font-bold">0</div>
                  <div className="text-gray-600">Postingan</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">{profile?.followers_count || 0}</div>
                  <div className="text-gray-600">Pengikut</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">{profile?.following_count || 0}</div>
                  <div className="text-gray-600">Mengikuti</div>
                </div>
              </div>

              <div className="flex gap-6">
                <Link to="/ukm/edit-profile" className="bg-gray-200 hover:bg-gray-300 px-8 py-4 rounded-xl text-lg font-medium">
                  Edit Profile
                </Link>
                <Link to="/ukm/posting" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl text-lg font-medium">
                  Buat Postingan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AkunUKM