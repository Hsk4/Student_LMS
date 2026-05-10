// Universal color palette
export const colors = {
  // Neutral palette
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  
  // Admin Dashboard Theme (Purple + Blue)
  admin: {
    sidebar: '#0F172A',
    sidebarHover: '#1E293B',
    sidebarActive: '#4F46E5',
    button: '#4F46E5',
    buttonHover: '#4338CA',
    stat: {
      revenue: '#2563EB',
      students: '#06B6D4',
      teachers: '#8B5CF6',
      requests: '#F43F5E',
    },
  },

  // Teacher Dashboard Theme (Green)
  teacher: {
    sidebar: '#111827',
    sidebarHover: '#1F2937',
    sidebarActive: '#10B981',
    button: '#10B981',
    buttonHover: '#059669',
    stat: {
      classes: '#10B981',
      attendance: '#0EA5E9',
      assignments: '#F59E0B',
      messages: '#6366F1',
    },
  },

  // Student Dashboard Theme (Amber)
  student: {
    sidebar: '#111827',
    sidebarHover: '#1F2937',
    sidebarActive: '#F59E0B',
    button: '#F59E0B',
    buttonHover: '#D97706',
    stat: {
      gpa: '#8B5CF6',
      attendance: '#22C55E',
      assignments: '#3B82F6',
      notices: '#EC4899',
    },
  },

  // Shared accent colors
  accent: {
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  },
}

export type ThemeRole = 'admin' | 'teacher' | 'student'

export const getThemeForRole = (role: ThemeRole) => {
  return colors[role]
}
