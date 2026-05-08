import React from 'react'
import type { AttendanceHeatmapProps } from '@/types/components'

export const AttendanceHeatmap: React.FC<AttendanceHeatmapProps> = ({ weeks }) => (
  <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ borderWidth: '0.5px' }}>
    <div className="mb-6">
      <h3 className="text-base font-semibold text-slate-900 mb-1">Attendance Heatmap</h3>
      <p className="text-sm text-slate-500 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-purple-600"></span>
        Last 4 weeks
      </p>
    </div>
    
    <div className="space-y-2 mb-6">
      <div className="flex gap-2">
        <div style={{width:32}}></div>
        <div className="grid grid-cols-7 gap-1 flex-1">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
            <div key={day} className="text-xs font-semibold text-slate-600 text-center">{day}</div>
          ))}
        </div>
      </div>
      
      {weeks.map(w => (
        <div key={w.label} className="flex gap-2 items-center">
          <div className="text-xs font-medium text-slate-600 w-8">{w.label}</div>
          <div className="grid grid-cols-7 gap-1 flex-1">
            {w.values.map((color, i) => (
              <div 
                key={i} 
                className="w-6 h-6 rounded border border-slate-200 hover:ring-2 hover:ring-offset-1 hover:ring-indigo-400 cursor-pointer transition-all" 
                style={{background: color}}
                title={`${w.label} - ${w.days[i]}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
    
    {/* Legend */}
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-600 font-medium">Low attendance</span>
      <div className="flex gap-1">
        <div style={{width:10, height:10, borderRadius:2, background:"#E24B4A"}} title="Critical"/>
        <div style={{width:10, height:10, borderRadius:2, background:"#F09595"}} title="Poor"/>
        <div style={{width:10, height:10, borderRadius:2, background:"#C0DD97"}} title="Average"/>
        <div style={{width:10, height:10, borderRadius:2, background:"#97C459"}} title="Good"/>
        <div style={{width:10, height:10, borderRadius:2, background:"#639922"}} title="Excellent"/>
      </div>
      <span className="text-slate-600 font-medium">High attendance</span>
    </div>
  </div>
);