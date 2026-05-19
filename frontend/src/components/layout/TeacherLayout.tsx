import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import Topbar from './Topbar'

export default function TeacherLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex h-screen theme-bg-teacher">
      <TeacherSidebar isMobileOpen={isMobileOpen} />

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMenuClick={() => setIsMobileOpen(!isMobileOpen)} />
        <main className="flex-1 overflow-auto lg:ml-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
