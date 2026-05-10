import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/helpers'
import STUDENT_NAV_ITEMS from '@/routes/studentNav.config'
import type { NavGroup } from '@/types/nav'
import UserMenu from '@/components/common/UserMenu'
import { themeClasses } from '@/styles/theme'
import { colors } from '@/data/themeColors'

export default function StudentSidebar({ isMobileOpen }: { isMobileOpen: boolean }) {
  const navData: NavGroup[] = STUDENT_NAV_ITEMS;
  const studentTheme = colors.student

  return (
    <aside 
      className={cn(
        `fixed inset-y-0 left-0 z-50 w-64 border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col`,
        !isMobileOpen && "-translate-x-full"
      )}
      style={{
        backgroundColor: studentTheme.sidebar,
        borderColor: `${studentTheme.sidebarHover}80`
      }}
    >
      <div className="px-4 py-5 border-b" style={{ borderColor: `${studentTheme.sidebarHover}80` }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-amber-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">🎓</span>
          </div>
          <span className="text-sm font-semibold text-white">Academix</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {navData.map((group) => (
          <div key={group.group}>
            <h3 className={themeClasses.sidebarTitle}>
              {group.group}
            </h3>
            <div className="space-y-1">
              {group.items?.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      `${themeClasses.sidebarLink} text-sm`,
                      isActive
                        ? `bg-student-active text-white font-medium`
                        : `text-slate-300 hover:bg-student-sidebar-hover`
                    )
                  }
                >
                  {item.icon && <item.icon size={16} />}
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className={themeClasses.sidebarFooter} style={{ borderColor: `${studentTheme.sidebarHover}80` }}>
        <UserMenu
          name={localStorage.getItem('studentName') || 'Student'}
          roleLabel={'Student'}
          userId={localStorage.getItem('studentId') || undefined}
        />
      </div>
    </aside>
  )
}

