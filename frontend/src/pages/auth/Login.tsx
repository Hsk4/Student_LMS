import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { loginRequest } from '@/services/authApi'
import Button from '@/components/common/Button'
import { themeClasses } from '@/styles/theme'
import type { AuthRole } from '@/types/components'

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [roleId, setRoleId] = useState('')
  const [password, setPassword] = useState('')

  const inferredRole: AuthRole = useMemo(() => {
    const normalized = roleId.trim().toLowerCase()
    if (normalized.startsWith('std')) return 'student'
    if (normalized.startsWith('tch')) return 'teacher'
    return 'admin'
  }, [roleId])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setStatus('Submit clicked. Preparing login request...')
    setLoading(true)

    if (import.meta.env.DEV) {
      console.log('[Login] submit started', { roleId })
    }

    try {
      const response = await loginRequest({
        roleId,
        password,
      })

      setStatus(`Login request completed for ${response.data.user.role}. Redirecting...`)

      if (import.meta.env.DEV) {
        console.log('[Login] submit success', {
          role: response.data.user.role,
          roleId: response.data.user.role_id,
        })
      }

      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('userRole', response.data.user.role)
      localStorage.setItem('userRoleId', response.data.user.role_id)
      localStorage.setItem('userName', response.data.user.FullName)
      localStorage.setItem('userId', response.data.user._id)

      const dashboardMap: Record<AuthRole, string> = {
        admin: '/admin/dashboard',
        teacher: '/teacher/dashboard',
        student: '/student/dashboard',
      }

      navigate(dashboardMap[response.data.user.role])
    } catch (err) {
      setStatus('Login request failed. Check the error below.')

      if (import.meta.env.DEV) {
        console.error('[Login] submit failed', err)
      }

      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className={`${themeClasses.card} mx-auto grid min-h-[calc(100vh-4rem)] max-w-5xl overflow-hidden lg:grid-cols-[1.05fr_0.95fr]`}>
        <section className="relative overflow-hidden bg-linear-to-br from-slate-900 to-slate-700 p-8 text-white sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-white/5" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                <ShieldCheck className="h-5 w-5" />
                LOGIN ACCESS
              </div>
              <h1 className="max-w-lg text-4xl font-black leading-tight sm:text-5xl">Sign in with your ID</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
                Student IDs must start with <span className="font-semibold">std</span>, teachers with <span className="font-semibold">tch</span>, and admin can log in with the admin ID directly.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">Student</p>
                <p className="mt-2 text-lg font-semibold">std123</p>
                <p className="mt-2 text-sm text-white/80">Routes to the student dashboard.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">Teacher</p>
                <p className="mt-2 text-lg font-semibold">tch456</p>
                <p className="mt-2 text-sm text-white/80">Routes to the teacher dashboard.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur sm:col-span-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">Admin</p>
                <p className="mt-2 text-lg font-semibold">hammad</p>
                <p className="mt-2 text-sm text-white/80">Routes to the admin dashboard.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Academics Portal</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Welcome back</h2>
              </div>
              <div className="rounded-[20px] bg-slate-100 p-3 text-slate-700 shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={themeClasses.label}>ID</label>
                <input
                  name="roleId"
                  value={roleId}
                  onChange={(event) => setRoleId(event.target.value)}
                  type="text"
                  required
                  placeholder="std123 or tch123"
                  className={themeClasses.input}
                />
                <p className="mt-2 text-xs text-slate-500">Detected role: <span className="font-semibold capitalize">{inferredRole}</span></p>
              </div>

              <div>
                <label className={themeClasses.label}>Password</label>
                <input
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  required
                  placeholder="••••••••"
                  className={themeClasses.input}
                />
              </div>

              <Button type="submit" className={`w-full bg-slate-900 hover:bg-slate-800 focus:ring-slate-200 ${themeClasses.button}`}>
                {loading ? 'Signing in…' : 'Sign in'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {status ? (
              <div className="mt-4 rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                {status}
              </div>
            ) : null}

            {error ? (
              <div className="mt-6 rounded-[20px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}
