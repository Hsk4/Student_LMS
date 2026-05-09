import { Calendar } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'

export default function StudentExams() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-amber-100 p-3">
          <Calendar size={28} className="text-amber-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Exams</h1>
          <p className="mt-1 text-sm text-slate-600">View upcoming and past exam schedules</p>
        </div>
      </div>

      <SectionCard title="Exam Schedule" description="Check your exam dates and details" badge="Coming Soon">
        <div className="p-12 text-center">
          <Calendar size={48} className="mx-auto mb-4 text-slate-300" />
          <p className="font-medium text-slate-500">Exam schedule coming soon</p>
          <p className="mt-2 text-sm text-slate-400">Your exam dates, times, and venues will be displayed</p>
        </div>
      </SectionCard>
    </div>
  )
}
