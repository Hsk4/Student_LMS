import { Navigate, Outlet, useLocation } from 'react-router-dom'
import type { AuthRole } from '@/types/components'

interface ProtectedRouteProps {
  allowedRoles?: AuthRole[]
}

function getStoredAuth() {
  const token = localStorage.getItem('authToken')
  const role = localStorage.getItem('userRole') as AuthRole | null
  return { token, role }
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation()
  const { token, role } = getStoredAuth()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!role) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    const fallback: Record<AuthRole, string> = {
      admin: '/admin/dashboard',
      teacher: '/teacher/dashboard',
      student: '/student/dashboard',
    }

    return <Navigate to={fallback[role] ?? '/login'} replace />
  }

  return <Outlet />
}
