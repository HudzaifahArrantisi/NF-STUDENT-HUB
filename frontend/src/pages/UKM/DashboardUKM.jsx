// src/pages/UKM/DashboardUKM.jsx
import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'

const DashboardUKM = () => {
  const quickActions = [
    { href: '/ukm/posting', label: '📝 Buat Postingan' },
    { href: '/ukm/anggota', label: '👥 Kelola Anggota' },
    { href: '/ukm/event', label: '🎯 Buat Event' },
    { href: '/ukm/galeri', label: '🖼️ Kelola Galeri' }
  ]

  const statsComponent = (stats) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
        <div className="text-2xl font-bold text-blue-600">{stats?.posts_count || 0}</div>
        <div className="text-xs text-blue-600 font-medium">Postingan</div>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
        <div className="text-2xl font-bold text-green-600">{stats?.followers_count || 0}</div>
        <div className="text-xs text-green-600 font-medium">Pengikut</div>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
        <div className="text-2xl font-bold text-purple-600">{stats?.members_count || 0}</div>
        <div className="text-xs text-purple-600 font-medium">Anggota</div>
      </div>
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
        <div className="text-2xl font-bold text-orange-600">{stats?.events_count || 0}</div>
        <div className="text-xs text-orange-600 font-medium">Event</div>
      </div>
    </div>
  )

  return (
    <DashboardLayout
      role="ukm"
      profileEndpoint="/api/ukm/profile"
      statsEndpoint="/api/ukm/stats"
      quickActions={quickActions}
      statsComponent={statsComponent}
    />
  )
}

export default DashboardUKM