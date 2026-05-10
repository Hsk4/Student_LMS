import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/utils/helpers';
import { ADMIN_NAV_ITEMS } from '@/routes/adminNav.config'; 
import type { NavGroup, NavLinkItem } from '@/types/nav';
import UserMenu from '@/components/common/UserMenu'
import { themeClasses } from '@/styles/theme'
import { colors } from '@/data/themeColors'
import { ChevronDown } from 'lucide-react'
import React from 'react'

export default function Sidebar({ isMobileOpen }: { isMobileOpen: boolean }) {
  const navData: NavGroup[] = ADMIN_NAV_ITEMS; 
  const adminTheme = colors.admin
  const location = useLocation()
  const [openMap, setOpenMap] = React.useState<Record<string, boolean>>({})

  const toggleOpen = (id: string) => {
    setOpenMap((m) => ({ ...m, [id]: !m[id] }))
  }

  return (
    <aside 
      className={cn(
        `fixed inset-y-0 left-0 z-50 w-64 border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col`,
        !isMobileOpen && "-translate-x-full"
      )}
      style={{
        backgroundColor: adminTheme.sidebar,
        borderColor: `${adminTheme.sidebarHover}80`
      }}
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b" style={{ borderColor: `${adminTheme.sidebarHover}80` }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">🎓</span>
          </div>
          <span className="text-sm font-semibold text-white">Academix</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {navData.map((group) => (
          <div key={group.group}>
            <h3 className={themeClasses.sidebarTitle}>
              {group.group}
            </h3>
            <div className="space-y-1">
              {group.items?.map((item: NavLinkItem) => {
                const hasChildren = Array.isArray(item.children) && item.children.length > 0
                const anyChildActive = hasChildren && item.children!.some((c) => location.pathname === c.path)

                return (
                  <div key={item.id}>
                    <div className="flex items-center justify-between">
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            `${themeClasses.sidebarLink} text-sm flex items-center justify-between gap-2`,
                            (isActive || anyChildActive)
                              ? `bg-admin-active text-white font-medium`
                              : `text-slate-300 hover:bg-admin-sidebar-hover`
                          )
                        }
                      >
                        <div className="flex items-center gap-2">
                          {item.icon && <item.icon size={16} />}
                          {item.label}
                        </div>
                      </NavLink>

                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => toggleOpen(item.id)}
                          className="p-2 text-slate-300 hover:text-white"
                          aria-expanded={!!openMap[item.id]}
                        >
                          <ChevronDown size={14} className={cn(openMap[item.id] ? 'rotate-180' : 'rotate-0', 'transition-transform')} />
                        </button>
                      )}
                    </div>

                    {hasChildren && openMap[item.id] && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.children!.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              cn(
                                `text-sm block px-2 py-1 rounded ${themeClasses.sidebarLink}`,
                                isActive ? 'bg-admin-active text-white font-medium' : 'text-slate-300 hover:bg-admin-sidebar-hover'
                              )
                            }
                          >
                            <div className="flex items-center gap-2">
                              {child.icon && <child.icon size={14} />}
                              {child.label}
                            </div>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
      
      {/* Footer */}
      <div className={themeClasses.sidebarFooter} style={{ borderColor: `${adminTheme.sidebarHover}80` }}>
        <UserMenu
          name={localStorage.getItem('adminName') || 'Admin'}
          roleLabel={'Admin'}
          userId={localStorage.getItem('adminId') || undefined}
        />
      </div>
    </aside>
  );
}