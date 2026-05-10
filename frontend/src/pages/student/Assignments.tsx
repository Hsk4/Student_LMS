import { ClipboardList } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'

export default function StudentAssignments() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ padding: 12, borderRadius: 12, backgroundColor: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ClipboardList size={28} style={{ color: '#4f46e5' }} />
        </div>
        <div>
          <h1 className="theme-h2">Assignments</h1>
          <p className="theme-text-sm" style={{ marginTop: 4, color: '#475569' }}>View and submit all assignments for your courses</p>
        </div>
      </div>

      <SectionCard title="Your Assignments" description="Manage and track all your assignments" badge="Coming Soon">
        <div style={{ padding: 48, textAlign: 'center' }}>
          <ClipboardList size={48} style={{ margin: '0 auto 16px', color: '#cbd5e1' }} />
          <p style={{ color: '#475569', fontWeight: 600 }}>Assignments will be displayed here</p>
          <p className="theme-text-sm" style={{ color: '#94a3b8', marginTop: 8 }}>Features coming soon</p>
        </div>
      </SectionCard>
    </div>
  )
}
