import React from "react";

export interface LeaveRequest {
  name: string;
  type: string;
  duration: string;
  date: string;
}

export interface LeaveRequestsCardProps {
  pending: LeaveRequest[];
}

export const LeaveRequestsCard: React.FC<LeaveRequestsCardProps> = ({ pending }) => (
  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden" style={{ borderWidth: '0.5px' }}>
    <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between" style={{ borderBottomWidth: '0.5px' }}>
      <h3 className="text-base font-semibold text-slate-900">Leave Requests</h3>
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
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