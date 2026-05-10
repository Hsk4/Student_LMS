import { Calendar } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'

export default function StudentExams() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ borderRadius: 12, backgroundColor: '#fffbeb', padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Calendar size={28} style={{ color: '#f59e0b' }} />
        </div>
        <div>
          <h1 className="theme-h2">My Exams</h1>
          <p className="theme-text-sm" style={{ marginTop: 4, color: '#475569' }}>View upcoming and past exam schedules</p>
        </div>
      </div>

      <SectionCard title="Exam Schedule" description="Check your exam dates and details" badge="Coming Soon">
        <div style={{ padding: 48, textAlign: 'center' }}>
          <Calendar size={48} style={{ margin: '0 auto 16px', color: '#cbd5e1' }} />
          <p style={{ color: '#475569', fontWeight: 600 }}>Exam schedule coming soon</p>
          <p className="theme-text-sm" style={{ color: '#94a3b8', marginTop: 8 }}>Your exam dates, times, and venues will be displayed</p>
        </div>
      </SectionCard>
    </div>
  )
}
