import { useNavigate } from 'react-router-dom'
import AuthPage from '@/components/common/AuthPage'
import type { AuthFormValues } from '@/types/components'

export default function AdminSignup() {
  const navigate = useNavigate()

  const handleSubmit = (values: AuthFormValues) => {
    console.log('Admin signup:', values)
    navigate('/admin/login')
  }

  return (
    <AuthPage
      mode="signup"
      role="admin"
      title="Create an admin account"
      subtitle="Set up a reusable auth flow that can later power teacher and student onboarding too."
      submitLabel="Create account"
      switchLabel="Already have an account? Sign in"
      switchHref="/admin/login"
      onSubmit={handleSubmit}
    />
  )
}
