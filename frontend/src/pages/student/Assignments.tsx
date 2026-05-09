import React from 'react'
import { ClipboardList } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'

export default function StudentAssignments() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-100 rounded-lg">
          <ClipboardList size={28} className="text-indigo-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Assignments</h1>
          <p className="text-sm text-slate-600 mt-1">View and submit all assignments for your courses</p>
        </div>
      </div>

      <SectionCard title="Your Assignments" description="Manage and track all your assignments" badge="Coming Soon">
        <div className="p-12 text-center">
          <ClipboardList size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">Assignments will be displayed here</p>
          <p className="text-slate-400 text-sm mt-2">Features coming soon</p>
        </div>
      </SectionCard>
    </div>
  )
}
