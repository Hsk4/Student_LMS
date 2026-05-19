import { BookOpen, ClipboardList, StickyNote, Bell, Users, LayoutDashboard, Layers3 } from 'lucide-react'
import type { NavGroup } from '@/types/nav'

export const TEACHER_NAV_ITEMS: NavGroup[] = [
  {
    group: 'Main',
    items: [
      { id: 'teacher-home', label: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    group: 'Classroom',
    items: [
      { id: 'teacher-classes', label: 'My Classes', path: '/teacher/dashboard#classes', icon: BookOpen },
      { id: 'teacher-students', label: 'Students by Class', path: '/teacher/dashboard#students', icon: Users },
      { id: 'teacher-quizzes', label: 'Quizzes', path: '/teacher/dashboard#quizzes', icon: ClipboardList },
    ],
  },
  {
    group: 'Tools',
    items: [
      { id: 'teacher-notes', label: 'Teacher Notes', path: '/teacher/dashboard#notes', icon: StickyNote },
      { id: 'teacher-reminders', label: 'Reminders', path: '/teacher/dashboard#reminders', icon: Bell },
      { id: 'teacher-planning', label: 'Planning', path: '/teacher/dashboard#study', icon: Layers3 },
    ],
  },
]

export default TEACHER_NAV_ITEMS
