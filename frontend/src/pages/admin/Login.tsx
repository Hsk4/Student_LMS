import { useNavigate } from 'react-router-dom'
import AuthPage from '@/components/common/AuthPage'
import type { AuthFormValues } from '@/types/components'

export default function AdminLogin() {
  const navigate = useNavigate()

  const handleSubmit = (values: AuthFormValues) => {
    console.log('Admin login:', values)
    navigate('/admin/dashboard')
  }

  return (
    <AuthPage
      mode="login"
      role="admin"
      title="Admin login"
      subtitle="Sign in to manage students, teachers, attendance, and dashboard tools from one place."
      submitLabel="Sign in"
      switchLabel="Need an account? Create one"
      switchHref="/admin/signup"
      onSubmit={handleSubmit}
    />
  )
}
