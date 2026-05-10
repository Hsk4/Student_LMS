import { TrendingUp } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'

export default function StudentProgress() {
  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="theme-badge theme-badge-info" style={{ padding: 10, borderRadius: 8 }}>
          <TrendingUp size={28} />
        </div>
        <div>
          <h1 className="theme-h2">Your Progress</h1>
          <p className="theme-text-sm" style={{ marginTop: 4 }}>Track your grades and academic performance</p>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <SectionCard title="Academic Overview" description="View your detailed progress metrics" badge="Coming Soon">
          <div style={{ padding: 48, textAlign: 'center' }}>
            <div style={{ margin: '0 auto', color: '#cbd5e1', marginBottom: 16 }}>
              <TrendingUp size={48} />
            </div>
            <p className="theme-text-base" style={{ color: '#64748b', fontWeight: 600 }}>Progress analytics coming soon</p>
            <p className="theme-text-sm" style={{ marginTop: 8, color: '#94a3b8' }}>Charts and detailed performance metrics will be available</p>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
