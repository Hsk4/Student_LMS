import { Home, BookOpen, StickyNote, HelpCircle, Mail, BarChart2, Calendar } from 'lucide-react'
import type { NavGroup } from '@/types/nav'

export const STUDENT_NAV_ITEMS: NavGroup[] = [
  {
    group: 'Main',
    items: [
      { id: 'home', label: 'Home', path: '/student/dashboard', icon: Home },
    ],
  },
  {
    group: 'Course',
    items: [
      { id: 'assignments', label: 'Assignments', path: '/student/assignments', icon: BookOpen },
      { id: 'notes', label: 'Notes', path: '/student/notes', icon: StickyNote },
      { id: 'progress', label: 'Progress', path: '/student/progress', icon: BarChart2 },
      { id: 'exams', label: 'My Exams', path: '/student/exams', icon: Calendar },
    ],
  },
  {
    group: 'Support',
    items: [
      { id: 'contact', label: 'Contact Teachers', path: '/student/contact', icon: Mail },
      { id: 'help', label: 'Help Us', path: '/student/help', icon: HelpCircle },
    ],
  },
]

export default STUDENT_NAV_ITEMS
