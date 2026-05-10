import { useState, useRef, useEffect } from 'react'
import { User, LogOut, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { UserMenuProps } from '@/types/components'

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
        className="theme-user-menu-trigger text-left"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="theme-badge theme-badge-info" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }}>{displayInitials || 'U'}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="theme-text-sm font-bold text-white truncate">{name || 'User'}</p>
          <p className="theme-text-xs text-slate-200 truncate">{roleLabel || ''}</p>
        </div>
      </button>

      {open && (
        <div className="absolute bottom-12 left-0 w-52 rounded-xl bg-white border border-slate-200 shadow-lg py-2 z-50">
          <button onClick={handleProfile} className="w-full text-left theme-btn-sm theme-btn flex items-center gap-3">
            <User size={16} />
            <span className="theme-text-sm">View profile</span>
          </button>
          <button onClick={() => navigate('/settings')} className="w-full text-left theme-btn-sm theme-btn flex items-center gap-3">
            <Settings size={16} />
            <span className="theme-text-sm">Settings</span>
          </button>
          <div className="border-t border-slate-100 my-1" />
          <button onClick={handleLogout} className="w-full text-left theme-btn-sm theme-btn flex items-center gap-3 theme-badge-danger">
            <LogOut size={16} />
            <span className="theme-text-sm">Logout</span>
          </button>
        </div>
      )}
    </div>
  )
}
