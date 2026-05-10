import StudentSidebar from './StudentSidebar'
import Topbar from './Topbar'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function StudentLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex h-screen theme-bg-student">
      <StudentSidebar isMobileOpen={isMobileOpen} />

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


