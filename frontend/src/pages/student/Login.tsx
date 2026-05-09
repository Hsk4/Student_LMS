import { useNavigate } from 'react-router-dom'
import AuthPage from '@/components/common/AuthPage'
import type { AuthFormValues } from '@/types/components'

export default function StudentLogin() {
  const navigate = useNavigate()

  const handleSubmit = (values: AuthFormValues) => {
    console.log('Student login:', values)
    navigate('/student/dashboard')
  }

  return (
    <AuthPage
      mode="login"
      role="student"
      title="Student login"
      subtitle="Sign in to access your courses, assignments and class materials."
      submitLabel="Sign in"
      switchLabel="Need an account? Create one"
      switchHref="/student/signup"
      onSubmit={handleSubmit}
    />
  )
}
