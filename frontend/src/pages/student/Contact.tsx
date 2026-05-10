import { Mail } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'

export default function StudentContact() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ padding: 12, backgroundColor: '#ecfdf5', borderRadius: 12 }}>
          <Mail size={28} style={{ color: '#059669' }} />
        </div>
        <div>
          <h1 className="theme-h2">Contact Teachers</h1>
          <p className="theme-text-sm" style={{ marginTop: 4, color: '#475569' }}>Send messages to your course instructors</p>
        </div>
      </div>

      <SectionCard title="Teacher Directory" description="Connect with your instructors" badge="Coming Soon">
        <div style={{ padding: 48, textAlign: 'center' }}>
          <Mail size={48} style={{ margin: '0 auto 16px', color: '#cbd5e1' }} />
          <p style={{ color: '#475569', fontWeight: 600 }}>Messaging system coming soon</p>
          <p className="theme-text-sm" style={{ color: '#94a3b8', marginTop: 8 }}>You'll be able to message teachers directly</p>
        </div>
      </SectionCard>
    </div>
  )
}
