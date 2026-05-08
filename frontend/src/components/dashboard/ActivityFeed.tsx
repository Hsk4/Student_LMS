import React from 'react'
import { UserPlus, CheckCircle, CreditCard, AlertCircle, MessageSquare } from 'lucide-react'
import type { ActivityFeedProps } from '@/types/components'

/**
 * Get icon component based on activity type
 */
const getActivityIcon = (type: string): React.ReactNode => {
  const iconProps = { size: 16 };
  switch (type) {
    case 'student_enrolled':
      return <UserPlus {...iconProps} />;
    case 'leave_approved':
      return <CheckCircle {...iconProps} />;
    case 'fee_payment':
      return <CreditCard {...iconProps} />;
    case 'exam_result':
      return <AlertCircle {...iconProps} />;
    case 'message':
      return <MessageSquare {...iconProps} />;
    default:
      return <MessageSquare {...iconProps} />;
  }
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ feed }) => (
  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden" style={{ borderWidth: '0.5px' }}>
    <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between" style={{ borderBottomWidth: '0.5px' }}>
      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-slate-900">Live Activity</h3>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
          <span>✦</span> Innovative
        </span>
      </div>
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span> Live
      </span>
    </div>
    
    <div className="divide-y divide-slate-200">
      {feed.map((item) => (
        <div key={item.id} className="px-6 py-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
          <div 
            className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm"
            style={{ background: item.bg, color: item.color }}
          >
            {getActivityIcon(item.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-900">{item.message}</p>
            <p className="text-xs text-slate-500 mt-1">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);