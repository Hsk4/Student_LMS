import React from 'react'
import type { SubjectPerformanceGaugesProps } from '@/types/components'

export const SubjectPerformanceGauges: React.FC<SubjectPerformanceGaugesProps> = ({ subjects }) => (
  <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ borderWidth: '0.5px' }}>
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-base font-semibold text-slate-900">Subject Performance</h3>
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
        <span>✦</span> Innovative
      </span>
    </div>
    
    <div className="space-y-4">
      {subjects.map(subj => (
        <div key={subj.name}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-900">{subj.name}</span>
            <span className="text-sm font-semibold text-slate-900">{subj.percent}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all" 
              style={{width: `${subj.percent}%`, background: subj.color}}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);