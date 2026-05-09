import React from 'react'
import { GraduationCap, Mail, Phone } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'
import DataTable from '@/components/common/DataTable'
import type { AdminStudentsSectionProps, DataTableColumn } from '@/types/components'

const StudentsSection: React.FC<AdminStudentsSectionProps> = ({ students }) => {
  const columns: DataTableColumn<AdminStudentsSectionProps['students'][number]>[] = [
    {
      header: 'Student',
      className: 'min-w-[220px]',
      render: (student) => (
        <div className="flex items-center gap-3">
          <img
            src={student.image}
            alt={student.name}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200"
          />
          <div>
            <p className="font-medium text-slate-900">{student.name}</p>
            <p className="text-xs text-slate-500">{student.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Roll Number',
      className: 'whitespace-nowrap',
      render: (student) => <span className="font-mono text-slate-700">{student.rollNumber}</span>,
    },
    {
      header: 'Class',
      render: (student) => <span className="text-slate-600">{student.class}</span>,
    },
    {
      header: 'GPA',
      render: (student) => (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 font-semibold text-amber-700">
          <GraduationCap size={14} />
          {student.gpa.toFixed(2)}
        </span>
      ),
    },
    {
      header: 'Guardian',
      render: (student) => <span className="text-slate-600">{student.guardianName}</span>,
    },
    {
      header: 'Status',
      render: (student) => (
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
            student.status === 'Active'
              ? 'bg-green-100 text-green-700'
              : student.status === 'Suspended'
                ? 'bg-red-100 text-red-700'
                : 'bg-slate-200 text-slate-700'
          }`}
        >
          {student.status}
        </span>
      ),
    },
    {
      header: 'Contact',
      render: (student) => (
        <div className="flex gap-2">
          <a href={`mailto:${student.email}`} className="text-slate-500 transition-colors hover:text-indigo-600">
            <Mail size={16} />
          </a>
          <a href={`tel:${student.phone}`} className="text-slate-500 transition-colors hover:text-indigo-600">
            <Phone size={16} />
          </a>
        </div>
      ),
    },
  ]

  return (
    <SectionCard title="Students" description="Complete student directory" badge={`${students.length} Total`}>
      <DataTable
        columns={columns}
        data={students}
        rowKey={(student) => student.id}
        emptyMessage="No students found"
        tableClassName="min-w-[980px]"
      />
    </SectionCard>
  )
}

export default StudentsSection
