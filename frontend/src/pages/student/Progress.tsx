import { TrendingUp } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'

export default function StudentProgress() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-100 rounded-lg">
          <TrendingUp size={28} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Your Progress</h1>
          <p className="text-sm text-slate-600 mt-1">Track your grades and academic performance</p>
        </div>
      </div>

      <SectionCard title="Academic Overview" description="View your detailed progress metrics" badge="Coming Soon">
        <div className="p-12 text-center">
          <TrendingUp size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">Progress analytics coming soon</p>
          <p className="text-slate-400 text-sm mt-2">Charts and detailed performance metrics will be available</p>
        </div>
      </SectionCard>
    </div>
  )
}
