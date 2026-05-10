import React from 'react'
import { themeClasses } from '@/styles/theme'
import type { LeaveRequestsCardProps } from '@/types/components'

export const LeaveRequestsCard: React.FC<LeaveRequestsCardProps> = ({ pending }) => (
  <div className={themeClasses.dashboardCardShell}>
    <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
      <h3 className={themeClasses.heading5}>Leave Requests</h3>
      <span className={themeClasses.badgeWarning}>
        {pending.length} pending
      </span>
    </div>
    
    <div className="divide-y divide-slate-200">
      {pending.map((req, i) => (
        <div key={i} className="px-6 py-4 hover:bg-slate-50 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-medium text-slate-900">{req.name}</p>
              <p className="text-sm text-slate-600">{req.type} · {req.duration} · {req.date}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 px-3 py-2 bg-green-50 text-green-700 font-medium text-sm rounded-lg hover:bg-green-100 transition-colors">
              ✓ Approve
            </button>
            <button className="flex-1 px-3 py-2 bg-red-50 text-red-700 font-medium text-sm rounded-lg hover:bg-red-100 transition-colors">
              ✗ Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);