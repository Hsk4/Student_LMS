import {
  LayoutDashboard,
  Users,
  UserCheck,
  Wallet,
  StickyNote,
  CalendarCheck,
} from 'lucide-react'

import type { NavGroup } from '@/types/nav'

export const ADMIN_NAV_ITEMS: NavGroup[] = [
  {
    group: 'Main',
    items: [
      {
        id: 'dash',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: LayoutDashboard,
      },
    ],
  },

  {
    group: 'Management',
    items: [
      { id: 'teachers', label: 'Teachers', path: '/admin/teachers', icon: Users },
      { id: 'students', label: 'Students', path: '/admin/students', icon: UserCheck },
      { id: 'attendance', label: 'Attendance', path: '/admin/attendance', icon: CalendarCheck },
    ],
  },

  {
    group: 'System',
    items: [
      { id: 'notes', label: 'Notes', path: '/admin/notes', icon: StickyNote },
      { id: 'accounts', label: 'Accounts', path: '/admin/accounts', icon: Wallet },
    ],
  },
]

export default ADMIN_NAV_ITEMS
