import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import AuthPage from '@/components/common/AuthPage'
import type { AuthFormValues, AuthRole } from '@/types/components'

export default function Signup() {
  const navigate = useNavigate()

  const handleSubmit = (values: AuthFormValues) => {
    console.log(`${values.role} signup:`, values)
    
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
        title: 'Create admin account',
        subtitle: 'Set up your admin account to manage academics, staff, and operations.',
      },
      teacher: {
        title: 'Create teacher account',
        subtitle: 'Set up your teacher account to manage classes and track attendance.',
      },
      student: {
        title: 'Create student account',
        subtitle: 'Set up your student account to access courses and track your progress.',
      },
    }
    return map[role]
  }

  // Determine which role this signup page is for based on route or default
  const role: AuthRole = 'student' // Could be 'admin' or 'teacher' on different instances

  const { title, subtitle } = useMemo(() => getTitleAndSubtitle(role), [role])

  return (
    <AuthPage
      mode="signup"
      role={role}
      title={title}
      subtitle={subtitle}
      submitLabel="Create account"
      switchLabel="Already have an account? Sign in"
      switchHref="/login"
      onSubmit={handleSubmit}
    />
  )
}
