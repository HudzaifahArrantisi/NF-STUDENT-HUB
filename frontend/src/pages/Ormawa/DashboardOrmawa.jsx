// src/pages/Ormawa/DashboardOrmawa.jsx
import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'

const DashboardOrmawa = () => {
  const quickActions = [
    { href: '/ormawa/posting', label: '📝 Buat Postingan' },
    { href: '/ormawa/anggota', label: '👥 Kelola Anggota' },
    { href: '/ormawa/event', label: '📅 Buat Event' },
    { href: '/ormawa/laporan', label: '📊 Laporan Kegiatan' }
  ]

  const statsComponent = (stats) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
        <div className="text-2xl font-bold text-blue-600">{stats?.total_anggota || 0}</div>
        <div className="text-xs text-blue-600 font-medium">Total Anggota</div>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
        <div className="text-2xl font-bold text-green-600">{stats?.posting_count || 0}</div>
        <div className="text-xs text-green-600 font-medium">Postingan</div>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
        <div className="text-2xl font-bold text-purple-600">{stats?.event_count || 0}</div>
        <div className="text-xs text-purple-600 font-medium">Event</div>
      </div>
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
        <div className="text-2xl font-bold text-orange-600">{stats?.pengikut || 0}</div>
        <div className="text-xs text-orange-600 font-medium">Pengikut</div>
      </div>
    </div>
  )

  return (
    <DashboardLayout
      role="ormawa"
      profileEndpoint="/api/ormawa/profile"
      statsEndpoint="/api/ormawa/stats"
      quickActions={quickActions}
      statsComponent={statsComponent}
    />
  )
}

export default DashboardOrmawa