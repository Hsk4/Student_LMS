import { useNavigate } from 'react-router-dom'
import AuthPage from '@/components/common/AuthPage'
import type { AuthFormValues } from '@/types/components'

export default function StudentSignup() {
  const navigate = useNavigate()

  const handleSubmit = (values: AuthFormValues) => {
    console.log('Student signup:', values)
    navigate('/student/login')
  }

  return (
    <AuthPage
      mode="signup"
      role="student"
      title="Create your student account"
      subtitle="Sign up to access courses, submit assignments, and track your progress."
      submitLabel="Create account"
      switchLabel="Already have an account? Sign in"
      switchHref="/student/login"
      onSubmit={handleSubmit}
    />
  )
}
