import React from 'react'
import type { AdminTeachersSectionProps, DataTableColumn } from '@/types/components'
import SectionCard from '@/components/common/SectionCard'
import DataTable from '@/components/common/DataTable'

export const TeachersSection: React.FC<AdminTeachersSectionProps> = ({ teachers }) => {
  const columns: DataTableColumn<AdminTeachersSectionProps['teachers'][number]>[] = [
    {
      header: 'Teacher',
      className: 'min-w-[240px]',
      render: (teacher) => (
        <div className="flex items-center gap-4">
          <img
            src={teacher.image}
            alt={teacher.name}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
          />
          <div>
            <h3 className="text-base font-semibold text-slate-900">{teacher.name}</h3>
            <p className="text-sm text-slate-600">{teacher.degree}</p>
            <p className="text-xs text-slate-500">{teacher.department}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Subject',
      render: (teacher) => <span className="text-slate-600">{teacher.subject}</span>,
    },
    {
      header: 'Experience',
      render: (teacher) => <span className="font-medium text-slate-700">{teacher.experienceYears} yrs</span>,
    },
    {
      header: 'Status',
      render: (teacher) => (
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
            teacher.status === 'Active'
              ? 'bg-green-100 text-green-700'
              : teacher.status === 'On Leave'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-slate-200 text-slate-700'
          }`}
        >
          {teacher.status}
        </span>
      ),
    },
  ]

  return (
    <SectionCard title="Teachers" description="Admin teacher directory" badge={`${teachers.length} Total`}>
      <div className="px-6 pb-6 pt-4">
        <DataTable
          columns={columns}
          data={teachers}
          rowKey={(teacher) => teacher.id}
          emptyMessage="No teachers found"
          tableClassName="min-w-[860px]"
        />
      </div>
    </SectionCard>
  )
}

export default TeachersSection
