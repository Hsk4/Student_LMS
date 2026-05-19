import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/utils/helpers'
import TEACHER_NAV_ITEMS from '@/routes/teacherNav.config'
import type { NavGroup } from '@/types/nav'
import UserMenu from '@/components/common/UserMenu'
import { themeClasses } from '@/styles/theme'
import { colors } from '@/data/themeColors'

export default function TeacherSidebar({ isMobileOpen }: { isMobileOpen: boolean }) {
  const navData: NavGroup[] = TEACHER_NAV_ITEMS
  const teacherTheme = colors.teacher
  const location = useLocation()

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col',
        !isMobileOpen && '-translate-x-full'
      )}
      style={{
        backgroundColor: teacherTheme.sidebar,
        borderColor: `${teacherTheme.sidebarHover}80`,
      }}
    >
      <div className="px-4 py-5 border-b" style={{ borderColor: `${teacherTheme.sidebarHover}80` }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">👩‍🏫</span>
          </div>
          <span className="text-sm font-semibold text-white">Teacher Hub</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {navData.map((group) => (
          <div key={group.group}>
            <h3 className={themeClasses.sidebarTitle}>{group.group}</h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path.split('#')[0]
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={cn(
                      `${themeClasses.sidebarLink} text-sm`,
                      isActive ? 'bg-teacher-active text-white font-medium' : 'text-slate-300 hover:bg-teacher-sidebar-hover'
                    )}
                  >
                    {item.icon && <item.icon size={16} />}
                    {item.label}
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className={themeClasses.sidebarFooter} style={{ borderColor: `${teacherTheme.sidebarHover}80` }}>
        <UserMenu
          name={localStorage.getItem('teacherName') || 'Teacher'}
          roleLabel="Teacher"
          userId={localStorage.getItem('teacherId') || undefined}
        />
      </div>
    </aside>
  )
}
