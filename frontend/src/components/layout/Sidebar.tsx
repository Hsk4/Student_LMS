import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/helpers';
import { ADMIN_NAV_ITEMS } from '@/routes/adminNav.config'; 
import type { NavGroup } from '@/types/nav';
import UserMenu from '@/components/common/UserMenu'

export default function Sidebar({ isMobileOpen }: { isMobileOpen: boolean }) {
  const navData: NavGroup[] = ADMIN_NAV_ITEMS; 

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col",
      !isMobileOpen && "-translate-x-full"
    )}>
      {/* Logo */}
      <div className="px-4 py-5 border-b border-slate-200 flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">🎓</span>
        </div>
        <span className="text-sm font-semibold text-slate-900">Academix</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {navData.map((group) => (
          <div key={group.group}>
            <h3 className="px-3 mb-3 text-xs font-bold tracking-wider text-slate-500 uppercase">
              {group.group}
            </h3>
            <div className="space-y-1">
              {group.items?.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                      isActive
                        ? "bg-indigo-50 text-indigo-600 font-medium"
                        : "text-slate-600 hover:bg-slate-50"
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
      
      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-200">
        <UserMenu
          name={localStorage.getItem('adminName') || 'Admin'}
          roleLabel={'Admin'}
          userId={localStorage.getItem('adminId') || undefined}
        />
      </div>
    </aside>
  );
}