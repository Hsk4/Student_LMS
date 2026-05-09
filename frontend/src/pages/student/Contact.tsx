import React from 'react'
import { Mail } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'

export default function StudentContact() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald-100 rounded-lg">
          <Mail size={28} className="text-emerald-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Contact Teachers</h1>
          <p className="text-sm text-slate-600 mt-1">Send messages to your course instructors</p>
        </div>
      </div>

      <SectionCard title="Teacher Directory" description="Connect with your instructors" badge="Coming Soon">
        <div className="p-12 text-center">
          <Mail size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">Messaging system coming soon</p>
          <p className="text-slate-400 text-sm mt-2">You'll be able to message teachers directly</p>
        </div>
      </SectionCard>
    </div>
  )
}
