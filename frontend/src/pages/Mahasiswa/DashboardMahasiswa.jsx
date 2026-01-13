// src/pages/Mahasiswa/DashboardMahasiswa.jsx
import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'

const DashboardMahasiswa = () => {
  // Quick actions untuk mahasiswa
  const quickActions = [
    { label: 'Lihat Matkul', href: '/mahasiswa/matkul' },
    { label: 'Pembayaran UKT', href: '/mahasiswa/pembayaran-ukt' },
    { label: 'Scan Absensi', href: '/mahasiswa/scan-absensi' },
    { label: 'Transkrip Nilai', href: '/mahasiswa/transkrip-nilai' }
  ]

  // Stats component untuk mahasiswa
  const statsComponent = (statsData) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-blue-600">{statsData?.total_matkul || 0}</div>
        <div className="text-sm text-blue-600">Total Matkul</div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-green-600">{statsData?.kehadiran || '0%'}</div>
        <div className="text-sm text-green-600">Rata² Kehadiran</div>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-purple-600">{statsData?.tugas_menunggu || 0}</div>
        <div className="text-sm text-purple-600">Tugas Menunggu</div>
      </div>
      <div className="bg-orange-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-orange-600">{statsData?.ukt_status || 'Lunas'}</div>
        <div className="text-sm text-orange-600">Status UKT</div>
      </div>
    </div>
  )

  return (
    <DashboardLayout
      role="mahasiswa"
      profileEndpoint="/api/mahasiswa/profile"
      statsEndpoint="/api/mahasiswa/stats"
      quickActions={quickActions}
      statsComponent={statsComponent}
    />
  )
}

export default DashboardMahasiswa