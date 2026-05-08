import React from 'react'
import type { FeeDonutChartProps } from '@/types/components'

export const FeeDonutChart: React.FC<FeeDonutChartProps> = ({
  total, paid, pending, overdue
}) => {
  const CIRC = 2 * Math.PI * 34;
  const paidArc = (paid/total)*CIRC;
  const pendingArc = (pending/total)*CIRC;
  const overdueArc = (overdue/total)*CIRC;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ borderWidth: '0.5px' }}>
      <h3 className="text-base font-semibold text-slate-900 mb-6">Fee Collection</h3>
      
      <div className="flex flex-col items-center gap-6">
        <svg viewBox="0 0 90 90" width={120} height={120}>
          <circle cx={45} cy={45} r={34} fill="none" stroke="#e2e8f0" strokeWidth="11"/>
          <circle cx={45} cy={45} r={34} fill="none" stroke="#6366f1" strokeWidth="11"
            strokeDasharray={`${paidArc} ${CIRC}`} strokeDashoffset="0"
            strokeLinecap="round" transform="rotate(-90 45 45)" />
          <circle cx={45} cy={45} r={34} fill="none" stroke="#f59e0b" strokeWidth="11"
            strokeDasharray={`${pendingArc} ${CIRC}`}
            strokeDashoffset={-paidArc}
            strokeLinecap="round" transform="rotate(-90 45 45)" />
          <circle cx={45} cy={45} r={34} fill="none" stroke="#ef4444" strokeWidth="11"
            strokeDasharray={`${overdueArc} ${CIRC}`}
            strokeDashoffset={-(paidArc+pendingArc)}
            strokeLinecap="round" transform="rotate(-90 45 45)" />
        </svg>
        
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="shrink-0 w-3 h-3 rounded-full" style={{background:"#6366f1"}}/>
              <span className="text-sm text-slate-600">Paid</span>
            </div>
            <span className="font-semibold text-slate-900">{paid}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="shrink-0 w-3 h-3 rounded-full" style={{background:"#f59e0b"}}/>
              <span className="text-sm text-slate-600">Pending</span>
            </div>
            <span className="font-semibold text-slate-900">{pending}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="shrink-0 w-3 h-3 rounded-full" style={{background:"#ef4444"}}/>
              <span className="text-sm text-slate-600">Overdue</span>
            </div>
            <span className="font-semibold text-slate-900">{overdue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}