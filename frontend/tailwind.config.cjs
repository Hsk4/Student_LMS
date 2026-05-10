/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Existing colors
        'accent': '#6366f1',
        'accent-light': '#e0e7ff',
        'accent-border': '#818cf8',
        'ink-900': '#1a202c',
        'ink-400': '#a0aec0',
        'ink-45': '#f7fafc',
        
        // Admin theme (Purple + Blue)
        'admin-sidebar': '#0F172A',
        'admin-sidebar-hover': '#1E293B',
        'admin-active': '#4F46E5',
        'admin-button': '#4F46E5',
        'admin-button-hover': '#4338CA',
        
        // Teacher theme (Green)
        'teacher-sidebar': '#111827',
        'teacher-sidebar-hover': '#1F2937',
        'teacher-active': '#10B981',
        'teacher-button': '#10B981',
        'teacher-button-hover': '#059669',
        
        // Student theme (Amber)
        'student-sidebar': '#111827',
        'student-sidebar-hover': '#1F2937',
        'student-active': '#F59E0B',
        'student-button': '#F59E0B',
        'student-button-hover': '#D97706',
        
        // Stat card colors - Admin
        'stat-revenue': '#2563EB',
        'stat-students': '#06B6D4',
        'stat-teachers': '#8B5CF6',
        'stat-requests': '#F43F5E',
        
        // Stat card colors - Teacher
        'stat-classes': '#10B981',
        'stat-attendance': '#0EA5E9',
        'stat-assignments': '#F59E0B',
        'stat-messages': '#6366F1',
        
        // Stat card colors - Student
        'stat-gpa': '#8B5CF6',
        'stat-attendance-s': '#22C55E',
        'stat-assignments-s': '#3B82F6',
        'stat-notices': '#EC4899',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px 0 rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
