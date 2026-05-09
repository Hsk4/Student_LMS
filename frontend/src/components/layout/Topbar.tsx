import { Menu, Search, Bell, Plus } from 'lucide-react'
import Button from '@/components/common/Button'
import type { TopbarProps } from '@/types/components'

export default function Topbar({ onMenuClick }: TopbarProps) {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = today.toLocaleDateString('en-US', options);
  const week = Math.ceil((today.getDate() + new Date(today.getFullYear(), today.getMonth(), 1).getDay()) / 7);

  // Get greeting based on time of day
  const hour = today.getHours();
  let greeting = 'Good morning';
  let emoji = '👋';
  if (hour >= 12 && hour < 18) {
    greeting = 'Good afternoon';
    emoji = '☀️';
  } else if (hour >= 18) {
    greeting = 'Good evening';
    emoji = '🌙';
  }

  // Get role and name from localStorage
  const role = localStorage.getItem('userRole') || 'Admin';
  const userName = role === 'student' 
    ? localStorage.getItem('studentName') || 'Student'
    : 'Admin';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4 flex-1">
          <Button
            onClick={onMenuClick}
            variant="secondary"
            className="lg:hidden p-1.5! rounded-lg!"
          >
            <Menu size={20} className="text-slate-600" />
          </Button>
          
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{greeting}, {userName} {emoji}</h1>
            <p className="text-xs text-slate-500 mt-0.5">{dateStr} · Term 2, Week {week}</p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg gap-2 w-64">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none flex-1"
            />
          </div>

          {/* Quick Add Button */}
          <Button variant="secondary" className="hidden sm:flex rounded-lg! px-3! py-1.5!">
            <Plus size={16} />
            Quick add
          </Button>

          {/* Notifications */}
          <Button variant="secondary" className="relative p-1.5! rounded-lg!">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  );
}

