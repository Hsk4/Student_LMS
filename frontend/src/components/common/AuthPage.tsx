import React, { useMemo, useState } from 'react'
import { ArrowRight, ShieldCheck, Sparkles, UserCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/common/Button'
import type { AuthPageProps, AuthFormValues, AuthRole } from '@/types/components'

const roleMeta: Record<AuthRole, { accent: string; icon: React.ReactElement; blurb: string }> = {
  admin: {
    accent: 'from-indigo-600 to-violet-600',
    icon: <ShieldCheck className="h-5 w-5" />,
    blurb: 'Manage academics, staff, and operations from one secure place.',
  },
  teacher: {
    accent: 'from-emerald-600 to-teal-600',
    icon: <Sparkles className="h-5 w-5" />,
    blurb: 'Track classes, attendance, and daily teaching activities.',
  },
  student: {
    accent: 'from-sky-600 to-cyan-600',
    icon: <UserCircle2 className="h-5 w-5" />,
    blurb: 'Access courses, notes, and personal progress in one view.',
  },
}

export default function AuthPage({
  mode,
  role,
  title,
  subtitle,
  submitLabel,
  switchLabel,
  switchHref,
  onSubmit,
}: AuthPageProps) {
  const [form, setForm] = useState<AuthFormValues>({
    fullName: '',
    username: '',
    id: '',
    email: '',
    password: '',
    confirmPassword: '',
    role,
  })

  const meta = roleMeta[role]
  const isSignup = mode === 'signup'

  const heading = useMemo(() => title, [title])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[1.15fr_0.85fr]">
        <section className={`relative overflow-hidden bg-linear-to-br ${meta.accent} p-8 text-white sm:p-10 lg:p-12`}>
          <div className="absolute inset-0 bg-white/5" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                {meta.icon}
                {role.toUpperCase()} ACCESS
              </div>
              <h1 className="max-w-lg text-4xl font-black leading-tight sm:text-5xl">{heading}</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/85 sm:text-lg">{subtitle}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">Role</p>
                <p className="mt-2 text-lg font-semibold">{role}</p>
                <p className="mt-2 text-sm text-white/80">{meta.blurb}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">Reusable</p>
                <p className="mt-2 text-lg font-semibold">One shared UI</p>
                <p className="mt-2 text-sm text-white/80">Use this same screen for admin, teacher, and student flows.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Academics Portal</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">{isSignup ? 'Create account' : 'Welcome back'}</h2>
              </div>
              <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignup && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              )}

              {isSignup && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Username</label>
                  <input
                    name="username"
                    value={form.username || ''}
                    onChange={handleChange}
                    type="text"
                    required
                    placeholder="Enter your username"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              )}

              {isSignup && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">ID</label>
                  <input
                    name="id"
                    value={form.id || ''}
                    onChange={handleChange}
                    type="text"
                    required
                    placeholder="Enter your ID"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              )}

              {!isSignup && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">ID</label>
                  <input
                    name="id"
                    value={form.id || ''}
                    onChange={handleChange}
                    type="text"
                    required
                    placeholder="Enter your ID"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {isSignup && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Confirm password</label>
                  <input
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    type="password"
                    required
                    placeholder="Repeat password"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              )}

              <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 focus:ring-slate-200">
                {submitLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              {switchLabel} <Link to={switchHref} className="font-semibold text-indigo-600 hover:text-indigo-700">here</Link>.
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
