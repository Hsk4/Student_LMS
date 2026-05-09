import { useState, useRef, useEffect } from 'react'
import { User, LogOut, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type UserMenuProps = {
  name?: string
  roleLabel?: string
  initials?: string
  userId?: string
  profileHref?: string
  onProfile?: (userId?: string) => void
  onLogout?: () => void
}

export default function UserMenu({ name, roleLabel, initials, userId, profileHref, onProfile, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const handleProfile = () => {
    setOpen(false)
    if (onProfile) {
      onProfile(userId)
      return
    }
    if (profileHref) {
      navigate(profileHref)
      return
    }
    // default: navigate to /profile
    navigate('/profile')
  }

  const handleLogout = () => {
    setOpen(false)
    if (onLogout) {
      onLogout()
      return
    }
    // default logout: clear localStorage and redirect to /login
    try {
      localStorage.removeItem('userRole')
      localStorage.removeItem('studentName')
    } catch (err) {
      // ignore
    }
    navigate('/login')
  }

  const displayInitials = initials || (name ? name.split(' ').map(n=>n[0]).slice(0,2).join('') : '')

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center gap-3 rounded-md px-1 py-1 hover:bg-slate-50"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">{displayInitials || 'U'}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 truncate">{name || 'User'}</p>
          <p className="text-xs text-slate-500 truncate">{roleLabel || ''}</p>
        </div>
      </button>

      {open && (
        <div className="absolute bottom-12 left-0 w-52 rounded-xl bg-white border border-slate-200 shadow-lg py-2 z-50">
          <button onClick={handleProfile} className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3">
            <User size={16} />
            <span className="text-sm">View profile</span>
          </button>
          <button onClick={() => navigate('/settings')} className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3">
            <Settings size={16} />
            <span className="text-sm">Settings</span>
          </button>
          <div className="border-t border-slate-100 my-1" />
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-red-600">
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      )}
    </div>
  )
}
