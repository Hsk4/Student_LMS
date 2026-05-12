import React, { useState } from 'react'
import { GraduationCap, MoreVertical } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'
import DataTable from '@/components/common/DataTable'
import StudentDetailModal from '@/components/admin/StudentDetailModal'
import { themeClasses } from '@/styles/theme'
import type { AdminStudentsSectionProps, DataTableColumn, AdminStudent } from '@/types/components'

const StudentsSection: React.FC<AdminStudentsSectionProps> = ({ students }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<AdminStudent | null>(null)
  const [showStudentModal, setShowStudentModal] = useState(false)

  const handleAction = (student: AdminStudent, action: string) => {
    if (action === 'view') {
      setSelectedStudent(student)
      setShowStudentModal(true)
    } else if (action === 'edit') {
      console.log(`Edit student: ${student.id}`)
    } else if (action === 'deactivate') {
      console.log(`Deactivate student: ${student.id}`)
    } else if (action === 'delete') {
      console.log(`Delete student: ${student.id}`)
    }
    setOpenMenuId(null)
  }

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
            <p className="text-xs text-slate-500">{student.studentId}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Roll Number',
      className: 'whitespace-nowrap',
      render: (student) =>   <span className={`${themeClasses.badgeWarning} inline-flex items-center gap-1`}>
          ₹{student.rollNumber.toLocaleString()}
        </span>,
    },
    {
      header: 'Email',
      className: 'min-w-[180px]',
      render: (student) => <span className="text-slate-600 text-sm">{student.email}</span>,
    },
    {
      header: 'Phone',
      className: 'whitespace-nowrap',
      render: (student) =>   <span className={`${themeClasses.badgeWarning} inline-flex items-center gap-1`}>
          ₹{student.phone.toLocaleString()}
        </span>,
    },
    {
      header: 'Homeroom Teacher',
      className: 'min-w-[150px]',
      render: (student) => <span className="text-slate-600">{student.homeroomTeacher}</span>,
    },
    {
      header: 'Semester Fees',
      className: 'whitespace-nowrap',
      render: (student) => (
        <span className={`${themeClasses.badgeWarning} inline-flex items-center gap-1`}>
          ₹{student.semesterFees.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Previous School',
      className: 'min-w-[180px]',
      render: (student) => <span className="text-slate-600 text-sm">{student.previousSchool}</span>,
    },
    {
      header: 'GPA',
      className: 'whitespace-nowrap',
      render: (student) => (
        <span className={`${themeClasses.badgeSuccess} inline-flex items-center gap-1`}>
          <GraduationCap size={14} />
          {student.gpa.toFixed(2)}
        </span>
      ),
    },
    {
      header: 'Status',
      className: 'whitespace-nowrap',
      render: (student) => (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${student.status === 'Active' ? themeClasses.badgeSuccess : student.status === 'Suspended' ? themeClasses.badgeDanger : themeClasses.badgeInfo}`}>
          {student.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      className: 'relative',
      render: (student) => (
        <div className="relative">
          <button
            onClick={() => setOpenMenuId(openMenuId === student.id ? null : student.id)}
            className="p-2 hover:bg-slate-100 rounded-md transition-colors"
          >
            <MoreVertical size={18} style={{ color: '#64748b' }} />
          </button>
          {openMenuId === student.id && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => handleAction(student, 'view')}
                className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                View Details
              </button>
              <button
                onClick={() => handleAction(student, 'edit')}
                className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleAction(student, 'deactivate')}
                className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Deactivate
              </button>
              <button
                onClick={() => handleAction(student, 'delete')}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-slate-200"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ]

  return (
    <>
      <SectionCard title="Students" description="Complete student directory" badge={`${students.length} Total`}>
        <DataTable
          columns={columns}
          data={students}
          rowKey={(student) => student.id}
          emptyMessage="No students found"
          tableClassName="min-w-[1400px]"
        />
      </SectionCard>
      <StudentDetailModal student={selectedStudent} isOpen={showStudentModal} onClose={() => setShowStudentModal(false)} />
    </>
  )
}

export default StudentsSection
