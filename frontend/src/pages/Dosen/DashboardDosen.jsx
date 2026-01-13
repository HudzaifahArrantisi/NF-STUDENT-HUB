// src/pages/Dosen/DashboardDosen.jsx
import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import api from '../../services/api'

const DashboardDosen = () => {
  const [stats, setStats] = useState({
    matkul_diajar: 0,
    mahasiswa_bimbingan: 0,
    tugas_perlu_dinilai: 0,
    sesi_absensi: 0
  })

  useEffect(() => {
    fetchDosenStats()
  }, [])

  const fetchDosenStats = async () => {
    try {
      const response = await api.getDosenStats()
      setStats(response.data.data)
    } catch (error) {
      console.error('Error fetching dosen stats:', error)
    }
  }

  const quickActions = [
    { href: '/dosen/absensi', label: '📋 Buat Absensi' },
    { href: '/dosen/matkul', label: '🎓 Mata Kuliah' },
    { href: '/dosen/penilaian', label: '📝 Penilaian' },
    { href: '/dosen/pesan', label: '💬 Pesan' }
  ]

  const statsComponent = (dashboardStats) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 shadow-sm">
        <div className="text-3xl font-bold text-blue-600">{stats.matkul_diajar}</div>
        <div className="text-sm text-blue-600 font-medium mt-2">Mata Kuliah</div>
        <div className="text-xs text-blue-500 mt-1">Yang diampu</div>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 shadow-sm">
        <div className="text-3xl font-bold text-green-600">{stats.mahasiswa_bimbingan}</div>
        <div className="text-sm text-green-600 font-medium mt-2">Mahasiswa</div>
        <div className="text-xs text-green-500 mt-1">Total bimbingan</div>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 shadow-sm">
        <div className="text-3xl font-bold text-purple-600">{stats.tugas_perlu_dinilai}</div>
        <div className="text-sm text-purple-600 font-medium mt-2">Perlu Dinilai</div>
        <div className="text-xs text-purple-500 mt-1">Tugas menunggu</div>
      </div>
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200 shadow-sm">
        <div className="text-3xl font-bold text-orange-600">{stats.sesi_absensi}</div>
        <div className="text-sm text-orange-600 font-medium mt-2">Sesi Absensi</div>
        <div className="text-xs text-orange-500 mt-1">Aktif</div>
      </div>
    </div>
  )

  return (
    <DashboardLayout
      role="dosen"
      profileEndpoint="/api/dosen/profile"
      statsEndpoint="/api/dosen/stats"
      quickActions={quickActions}
      statsComponent={statsComponent}
      customStats={stats}
    />
  )
}

export default DashboardDosen