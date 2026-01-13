// src/pages/OrangTua/DashboardOrtu.jsx
import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'

const DashboardOrtu = () => {
  const quickActions = [
    { href: '/ortu/pantau-kehadiran', label: '📊 Pantau Kehadiran' },
    { href: '/ortu/pembayaran-ukt', label: '💳 Pembayaran UKT' },
    { href: '/ortu/nilai-akademik', label: '📈 Nilai Akademik' },
    { href: '/ortu/aktivitas', label: '📝 Aktivitas Terbaru' }
  ]

  const statsComponent = (stats) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
        <div className="text-2xl font-bold text-blue-600">{stats?.rata_kehadiran || '0%'}</div>
        <div className="text-xs text-blue-600 font-medium">Rata Kehadiran</div>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
        <div className="text-2xl font-bold text-green-600">{stats?.rata_nilai || '-'}</div>
        <div className="text-xs text-green-600 font-medium">Rata Nilai</div>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
        <div className="text-2xl font-bold text-purple-600">{stats?.status_ukt || 'Lunas'}</div>
        <div className="text-xs text-purple-600 font-medium">Status UKT</div>
      </div>
    </div>
  )

  return (
    <DashboardLayout
      role="orangtua"
      profileEndpoint="/api/orangtua/profile"
      statsEndpoint="/api/orangtua/stats"
      quickActions={quickActions}
      statsComponent={statsComponent}
    />
  )
}

export default DashboardOrtu