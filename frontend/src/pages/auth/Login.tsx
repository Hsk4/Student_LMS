import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import AuthPage from '@/components/common/AuthPage'
import type { AuthFormValues, AuthRole } from '@/types/components'

export default function Login() {
  const navigate = useNavigate()

  const handleSubmit = (values: AuthFormValues) => {
    console.log(`${values.role} login:`, values)
    
    // Store user info in localStorage
    localStorage.setItem('userRole', values.role)
    if (values.role === 'student' && values.fullName) {
      localStorage.setItem('studentName', values.fullName)
    }
    
    // Navigate to appropriate dashboard based on role
    const dashboardMap: Record<AuthRole, string> = {
      admin: '/admin/dashboard',
      teacher: '/teacher/dashboard',
      student: '/student/dashboard',
    }
    
    navigate(dashboardMap[values.role])
  }

  // Get text content based on role
  const getTitleAndSubtitle = (role: AuthRole) => {
    const map: Record<AuthRole, { title: string; subtitle: string }> = {
      admin: {
        title: 'Admin login',
        subtitle: 'Sign in to manage students, teachers, attendance, and dashboard tools.',
      },
      teacher: {
        title: 'Teacher login',
        subtitle: 'Sign in to track classes, attendance, and manage teaching activities.',
      },
      student: {
        title: 'Student login',
        subtitle: 'Sign in to access your courses, assignments and class materials.',
      },
    }
    return map[role]
  }

  // Determine which role this login page is for based on route or default
  const role: AuthRole = 'student' // Could be 'admin' or 'teacher' on different instances

  const { title, subtitle } = useMemo(() => getTitleAndSubtitle(role), [role])

  return (
    <AuthPage
      mode="login"
      role={role}
      title={title}
      subtitle={subtitle}
      submitLabel="Sign in"
      switchLabel="Need an account? Create one"
      switchHref="/signup"
      onSubmit={handleSubmit}
    />
  )
}
