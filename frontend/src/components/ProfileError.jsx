// src/components/ProfileError.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const ProfileError = ({ error, role }) => {
  const getRoleInfo = (role) => {
    switch(role) {
      case 'admin':
        return { color: 'blue', name: 'Administrator', table: 'admin' }
      case 'ukm':
        return { color: 'orange', name: 'UKM', table: 'ukm' }
      case 'ormawa':
        return { color: 'purple', name: 'Ormawa', table: 'ormawa' }
      default:
        return { color: 'gray', name: 'User', table: 'users' }
    }
  }

  const roleInfo = getRoleInfo(role)

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="text-6xl mb-6">😕</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Profile Tidak Ditemukan
          </h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-red-800 font-medium">Error Details:</p>
            <p className="text-red-600 text-sm mt-2">{error}</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-blue-800 font-medium">Informasi Role:</p>
            <p className="text-blue-600 text-sm mt-1">
              <strong>Role:</strong> {roleInfo.name} ({role})
            </p>
            <p className="text-blue-600 text-sm">
              <strong>Tabel Database:</strong> {roleInfo.table}
            </p>
            <p className="text-blue-600 text-sm">
              <strong>Solusi:</strong> Pastikan data Anda sudah terdaftar di tabel {roleInfo.table}
            </p>
          </div>

          <div className="space-x-4">
            <Link 
              to="/" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kembali ke Beranda
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileError