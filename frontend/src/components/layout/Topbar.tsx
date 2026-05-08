import { Menu, Search, Bell, Plus } from 'lucide-react'
import type { TopbarProps } from '@/types/components'

export default function Topbar({ onMenuClick }: TopbarProps) {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = today.toLocaleDateString('en-US', options);
  const week = Math.ceil((today.getDate() + new Date(today.getFullYear(), today.getMonth(), 1).getDay()) / 7);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-slate-600" />
          </button>
          
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Good morning, Admin 👋</h1>
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
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors text-sm text-slate-700 font-medium">
            <Plus size={16} />
            Quick add
          </button>

          {/* Notifications */}
          <button className="relative p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}

