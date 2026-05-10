import React, { useState } from 'react'
import { Search, MoreVertical } from 'lucide-react'
import type { AdminTeachersSectionProps, DataTableColumn, AdminTeacher } from '@/types/components'
import SectionCard from '@/components/common/SectionCard'
import DataTable from '@/components/common/DataTable'
import TeacherDetailModal from '@/components/admin/TeacherDetailModal'
import { themeClasses } from '@/styles/theme'

export const TeachersSection: React.FC<AdminTeachersSectionProps> = ({ teachers }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [selectedTeacher, setSelectedTeacher] = useState<AdminTeacher | null>(null)
  const [showTeacherModal, setShowTeacherModal] = useState(false)

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) || teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAction = (teacher: AdminTeacher, action: string) => {
    if (action === 'view') {
      setSelectedTeacher(teacher)
      setShowTeacherModal(true)
    } else if (action === 'edit') {
      console.log(`Edit teacher: ${teacher.id}`)
    } else if (action === 'deactivate') {
      console.log(`Deactivate teacher: ${teacher.id}`)
    } else if (action === 'delete') {
      console.log(`Delete teacher: ${teacher.id}`)
    }
    setOpenMenuId(null)
  }

  const columns: DataTableColumn<AdminTeachersSectionProps['teachers'][number]>[] = [
    {
      header: 'Teacher',
      className: 'min-w-[240px]',
      render: (teacher) => (
        <div className="flex items-center gap-4">
          <img src={teacher.image} alt={teacher.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-white" />
          <div>
            <h3 className="text-base font-semibold text-slate-900">{teacher.name}</h3>
            <p className="text-sm text-slate-600">{teacher.degree}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Subject',
      className: 'whitespace-nowrap',
      render: (teacher) => <span className="text-slate-600">{teacher.subject}</span>,
    },
    {
      header: 'Batch',
      className: 'min-w-[150px]',
      render: (teacher) => <span className="text-slate-600 text-sm">{teacher.batch}</span>,
    },
    {
      header: 'Semester',
      className: 'min-w-[130px]',
      render: (teacher) => <span className="text-slate-600 text-sm">{teacher.semester}</span>,
    },
    {
      header: 'Attendance %',
      className: 'whitespace-nowrap',
      render: (teacher) => (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${teacher.attendance >= 80 ? themeClasses.badgeSuccess : teacher.attendance >= 70 ? themeClasses.badgeWarning : themeClasses.badgeDanger}`}>
          {teacher.attendance}%
        </span>
      ),
    },
    {
      header: 'Joined Date',
      className: 'whitespace-nowrap',
      render: (teacher) => <span className="text-slate-600">{new Date(teacher.joinedDate).toLocaleDateString()}</span>,
    },
    {
      header: 'Salary',
      className: 'whitespace-nowrap',
      render: (teacher) => <span className="font-medium text-slate-700">₹{teacher.salary.toLocaleString()}</span>,
    },
    {
      header: 'Total Students',
      className: 'whitespace-nowrap',
      render: (teacher) => <span className="text-slate-600 font-medium">{teacher.totalStudents}</span>,
    },
    {
      header: 'Status',
      className: 'whitespace-nowrap',
      render: (teacher) => (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${teacher.status === 'Active' ? themeClasses.badgeSuccess : teacher.status === 'On Leave' ? themeClasses.badgeWarning : themeClasses.badgeInfo}`}>
          {teacher.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      className: 'relative',
      render: (teacher) => (
        <div className="relative">
          <button
            onClick={() => setOpenMenuId(openMenuId === teacher.id ? null : teacher.id)}
            className="p-2 hover:bg-slate-100 rounded-md transition-colors"
          >
            <MoreVertical size={18} style={{ color: '#64748b' }} />
          </button>
          {openMenuId === teacher.id && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
              <button onClick={() => handleAction(teacher, 'view')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                View Details
              </button>
              <button onClick={() => handleAction(teacher, 'edit')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                Edit
              </button>
              <button onClick={() => handleAction(teacher, 'deactivate')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                Deactivate
              </button>
              <button onClick={() => handleAction(teacher, 'delete')} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-slate-200">
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
      <SectionCard title="Teachers" description="Complete teacher directory" badge={`${filteredTeachers.length} Total`}>
        <div className="px-6 pb-6 pt-4">
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search teachers by name, email, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <DataTable
            columns={columns}
            data={filteredTeachers}
            rowKey={(teacher) => teacher.id}
            emptyMessage="No teachers found"
            tableClassName="min-w-[1200px]"
          />
        </div>
      </SectionCard>
      <TeacherDetailModal teacher={selectedTeacher} isOpen={showTeacherModal} onClose={() => setShowTeacherModal(false)} />
    </>
  )
}

export default TeachersSection
