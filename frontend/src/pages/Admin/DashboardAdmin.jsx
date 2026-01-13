// src/pages/Admin/DashboardAdmin.jsx
import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'

const DashboardAdmin = () => {
  const quickActions = [
    { href: '/admin/posting-pemberitahuan', label: '📢 Buat Pemberitahuan' },
    { href: '/admin/pemantauan-ukt', label: '💰 Pemantauan UKT' },
    { href: '/admin/kelola-akun', label: '👥 Kelola Akun' },
    { href: '/admin/laporan', label: '📈 Laporan Sistem' }
  ]

  const statsComponent = (stats) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
        <div className="text-2xl font-bold text-blue-600">{stats?.totalMahasiswa || 0}</div>
        <div className="text-xs text-blue-600 font-medium">Total Mahasiswa</div>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
        <div className="text-2xl font-bold text-green-600">{stats?.totalDosen || 0}</div>
        <div className="text-xs text-green-600 font-medium">Total Dosen</div>
      </div>
      <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
        <div className="text-2xl font-bold text-red-600">{stats?.uktBelumBayar || 0}</div>
        <div className="text-xs text-red-600 font-medium">UKT Belum Bayar</div>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
        <div className="text-2xl font-bold text-purple-600">{stats?.totalUkmOrmawa || 0}</div>
        <div className="text-xs text-purple-600 font-medium">UKM/Ormawa</div>
      </div>
    </div>
  )

  return (
    <DashboardLayout
      role="admin"
      profileEndpoint="/api/admin/profile"
      statsEndpoint="/api/admin/stats"
      quickActions={quickActions}
      statsComponent={statsComponent}
    />
  )
}

export default DashboardAdmin