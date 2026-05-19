import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '@/components/common/Button'
import type { AdminStudent, AdminTeacher } from '@/types/components'
import useAccountsStore from '@/stores/useAccountsStore'
import { themeClasses } from '@/styles/theme'
import { Search } from 'lucide-react'
import { createStudent, createTeacher, type CreateStudentPayload, type CreateTeacherPayload } from '@/services/adminAccountsApi'
import Toast from '@/components/common/Toast'

const generateNextPrefixedId = (prefix: 'std' | 'tch', existingIds: Array<string | undefined>) => {
  const highest = existingIds.reduce((currentHighest, currentId) => {
    if (!currentId) return currentHighest

    const match = currentId.trim().toLowerCase().match(new RegExp('^' + prefix + '(\\d+)$'))
    if (!match) return currentHighest

    const parsed = Number.parseInt(match[1] ?? '0', 10)
    return Number.isNaN(parsed) ? currentHighest : Math.max(currentHighest, parsed)
  }, 0)

  return `${prefix}${String(highest + 1).padStart(3, '0')}`
}

const mapCreatedStudentToUi = (student: {
  FullName: string
  StudentID: string
  RollNumber: string
  Email: string
  Phone: string
  HomeroomTeacher: string
  SemesterFees: number
  PreviousSchool: string
}): Omit<AdminStudent, 'id'> => ({
  name: student.FullName,
  studentId: student.StudentID,
  rollNumber: student.RollNumber,
  email: student.Email,
  phone: student.Phone,
  password: '',
  homeroomTeacher: student.HomeroomTeacher,
  teacherId: undefined,
  semesterFees: student.SemesterFees,
  previousSchool: student.PreviousSchool,
  guardianName: 'N/A',
  guardianPhone: 'N/A',
  status: 'Active',
  gpa: 0,
  joinDate: new Date().toISOString().split('T')[0],
  class: 'N/A',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
})

const mapCreatedTeacherToUi = (teacher: {
  FullName: string
  TeacherID: string
  Degree: string
  Subject: string
  Batch: string
  Semester: string
  JoinedDate: string
  Salary: number
  TotalStudents: number
  Email: string
  Phone: string
  Department: string
  PreviousSchool: string
}): AdminTeacher => ({
  id: teacher.TeacherID,
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  name: teacher.FullName,
  degree: teacher.Degree,
  subject: teacher.Subject,
  batch: teacher.Batch,
  semester: teacher.Semester,
  attendance: 0,
  joinedDate: teacher.JoinedDate,
  salary: teacher.Salary,
  totalStudents: teacher.TotalStudents,
  status: 'Active',
  email: teacher.Email,
  phone: teacher.Phone,
  experienceYears: 0,
  department: teacher.Department,
})

const Accounts: React.FC = () => {
  const [searchParams] = useSearchParams()
  const students = useAccountsStore((s) => s.students)
  const teachers = useAccountsStore((s) => s.teachers)
  const addStudentToStore = useAccountsStore((s) => s.addStudent)
  const addTeacherToStore = useAccountsStore((s) => s.addTeacher)

  const [activeForm, setActiveForm] = useState<'student' | 'teacher' | null>(null)
  const [userType, setUserType] = useState<'all' | 'students' | 'teachers'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Inactive'>('all')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  useEffect(() => {
    if (!toast) return

    const timeout = window.setTimeout(() => setToast(null), 4000)
    return () => window.clearTimeout(timeout)
  }, [toast])

  // Auto-open form if sidebar link is clicked
  useEffect(() => {
    const formType = searchParams.get('form')
    if (formType === 'student' || formType === 'teacher') {
      setActiveForm(formType)
    }
  }, [searchParams])

  const handleAddStudent = async (payload: CreateStudentPayload) => {
    try {
      const createdStudent = await createStudent(payload)
      addStudentToStore(mapCreatedStudentToUi(createdStudent))
      setActiveForm(null)
      setToast({ message: `Student ${createdStudent.StudentID} saved successfully.`, type: 'success' })
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : 'Failed to save student.', type: 'error' })
      throw error
    }
  }

  const handleAddTeacher = async (payload: CreateTeacherPayload) => {
    try {
      const createdTeacher = await createTeacher(payload)
      addTeacherToStore(mapCreatedTeacherToUi(createdTeacher))
      setActiveForm(null)
      setToast({ message: `Teacher ${createdTeacher.TeacherID} saved successfully.`, type: 'success' })
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : 'Failed to save teacher.', type: 'error' })
      throw error
    }
  }

  // Filter logic
  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const allUsers = [
    ...filteredStudents.map((s) => ({ type: 'student' as const, ...s })),
    ...filteredTeachers.map((t) => ({ type: 'teacher' as const, ...t })),
  ]

  const displayUsers = userType === 'all' ? allUsers : userType === 'students' ? filteredStudents.map((s) => ({ type: 'student' as const, ...s })) : filteredTeachers.map((t) => ({ type: 'teacher' as const, ...t }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className={themeClasses.heading2}>Accounts</h1>
        <p className={themeClasses.textSm}>Manage all Students and Teachers</p>
      </div>

      {toast ? <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null}

      {/* Add Student/Teacher Forms */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Add Student Card */}
        <div className={themeClasses.dashboardCardShell}>
          <div className="px-6 py-4 border-b" style={{ borderColor: '#e2e8f0' }}>
            <h2 className={themeClasses.heading4}>Add New Student</h2>
          </div>
          <div className="px-6 py-4">
            {activeForm === 'student' ? (
              <StudentAddForm onAdd={handleAddStudent} onCancel={() => setActiveForm(null)} />
            ) : (
              <Button onClick={() => setActiveForm('student')} className="w-full">
                + Add Student
              </Button>
            )}
          </div>
        </div>

        {/* Add Teacher Card */}
        <div className={themeClasses.dashboardCardShell}>
          <div className="px-6 py-4 border-b" style={{ borderColor: '#e2e8f0' }}>
            <h2 className={themeClasses.heading4}>Add New Teacher</h2>
          </div>
          <div className="px-6 py-4">
            {activeForm === 'teacher' ? (
              <TeacherAddForm onAdd={handleAddTeacher} onCancel={() => setActiveForm(null)} />
            ) : (
              <Button onClick={() => setActiveForm('teacher')} className="w-full">
                + Add Teacher
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* All Users List with Filters */}
      <div className={themeClasses.dashboardCardShell}>
        <div className="px-6 py-4 border-b" style={{ borderColor: '#e2e8f0' }}>
          <h2 className={themeClasses.heading4}>All Users</h2>
          <p className={themeClasses.textSm}>Students and Teachers combined</p>
        </div>

        <div className="px-6 py-4 space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${themeClasses.input} pl-10`}
              />
            </div>
            <div className="flex gap-2">
              <select value={userType} onChange={(e) => setUserType(e.target.value as 'all' | 'students' | 'teachers')} className={themeClasses.select}>
                <option value="all">All Users</option>
                <option value="students">Students</option>
                <option value="teachers">Teachers</option>
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'all' | 'Active' | 'Inactive')} className={themeClasses.select}>
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Users List */}
          <div className={themeClasses.tableContainer}>
            <table className="w-full">
              <thead>
                <tr className={themeClasses.tableHeader}>
                  <th className={themeClasses.tableCellHeader}>User</th>
                  <th className={themeClasses.tableCellHeader}>Type</th>
                  <th className={themeClasses.tableCellHeader}>Email</th>
                  <th className={themeClasses.tableCellHeader}>Status</th>
                </tr>
              </thead>
              <tbody>
                {displayUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className={`${themeClasses.tableCell} text-center py-8 text-slate-500`}>
                      No users found
                    </td>
                  </tr>
                ) : (
                  displayUsers.map((user) => (
                    <tr key={user.id} className={themeClasses.tableRow}>
                      <td className={`${themeClasses.tableCell} flex items-center gap-3`}>
                        <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className={themeClasses.textBase}>{user.name}</span>
                      </td>
                      <td className={themeClasses.tableCell}>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${user.type === 'student' ? themeClasses.badgeInfo : themeClasses.badgeSuccess}`}>
                          {user.type === 'student' ? 'Student' : 'Teacher'}
                        </span>
                      </td>
                      <td className={themeClasses.tableCell}>
                        <span className={themeClasses.textSm}>{user.email}</span>
                      </td>
                      <td className={themeClasses.tableCell}>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${user.status === 'Active' ? themeClasses.badgeSuccess : themeClasses.badgeWarning}`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Small inline Add Student form (backend-shaped fields) */
const StudentAddForm: React.FC<{ onAdd: (s: CreateStudentPayload) => Promise<void> | void; onCancel?: () => void }> = ({ onAdd, onCancel }) => {
  const studentsList = useAccountsStore((s) => s.students)
  const [formData, setFormData] = useState<CreateStudentPayload>({
    FullName: '',
    StudentID: '',
    RollNumber: '',
    Email: '',
    Phone: '',
    Password: '',
    HomeroomTeacher: '',
    SemesterFees: 150000,
    PreviousSchool: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'SemesterFees' ? Number(value) : value,
    }))
  }

  const handleGenerateStudentId = () => {
    setFormData((prev) => ({
      ...prev,
      StudentID: generateNextPrefixedId('std', studentsList.map((student) => student.studentId)),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const studentId = formData.StudentID.trim() || generateNextPrefixedId('std', studentsList.map((student) => student.studentId))

    try {
      await onAdd({
        ...formData,
        StudentID: studentId,
        SemesterFees: Number(formData.SemesterFees),
      })

      setFormData({
        FullName: '',
        StudentID: '',
        RollNumber: '',
        Email: '',
        Phone: '',
        Password: '',
        HomeroomTeacher: '',
        SemesterFees: 150000,
        PreviousSchool: '',
      })
    } catch {
      // Toast state is handled by the parent Accounts page.
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className={themeClasses.label}>Full Name *</label>
          <input name="FullName" value={formData.FullName} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between gap-3">
            <label className={themeClasses.label}>Student ID *</label>
            <Button type="button" variant="secondary" onClick={handleGenerateStudentId} className="px-3 py-1 text-xs">
              Generate ID
            </Button>
          </div>
          <input name="StudentID" value={formData.StudentID} onChange={handleChange} placeholder="Click Generate ID" required readOnly className={themeClasses.input} />
          <p className="mt-1 text-xs text-slate-500">Generated IDs use the <span className="font-semibold">std</span> prefix like <span className="font-semibold">std001</span>.</p>
        </div>
        <div>
          <label className={themeClasses.label}>Roll Number *</label>
          <input name="RollNumber" value={formData.RollNumber} onChange={handleChange} placeholder="e.g., 001" required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Email *</label>
          <input type="email" name="Email" value={formData.Email} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Phone *</label>
          <input name="Phone" value={formData.Phone} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Password *</label>
          <input type="password" name="Password" value={formData.Password} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Homeroom Teacher *</label>
          <input name="HomeroomTeacher" value={formData.HomeroomTeacher} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Semester Fees *</label>
          <input type="number" name="SemesterFees" value={formData.SemesterFees} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Previous School *</label>
          <input name="PreviousSchool" value={formData.PreviousSchool} onChange={handleChange} required className={themeClasses.input} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          Add
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

/* Small inline Add Teacher form (backend-shaped fields) */
const TeacherAddForm: React.FC<{ onAdd: (t: CreateTeacherPayload) => Promise<void> | void; onCancel?: () => void }> = ({ onAdd, onCancel }) => {
  const teachersList = useAccountsStore((s) => s.teachers)
  const [formData, setFormData] = useState<CreateTeacherPayload>({
    FullName: '',
    TeacherID: '',
    Degree: '',
    Subject: '',
    Batch: '',
    Semester: '',
    JoinedDate: new Date().toISOString().split('T')[0],
    Salary: 60000,
    TotalStudents: 0,
    Email: '',
    Phone: '',
    Password: '',
    Department: '',
    PreviousSchool: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'Salary' || name === 'TotalStudents' ? Number(value) : value,
    }))
  }

  const handleGenerateTeacherId = () => {
    setFormData((prev) => ({
      ...prev,
      TeacherID: generateNextPrefixedId('tch', teachersList.map((teacher) => teacher.id)),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const teacherId = formData.TeacherID.trim() || generateNextPrefixedId('tch', teachersList.map((teacher) => teacher.id))

    try {
      await onAdd({
        ...formData,
        TeacherID: teacherId,
        Salary: Number(formData.Salary),
        TotalStudents: Number(formData.TotalStudents),
      })

      setFormData({
        FullName: '',
        TeacherID: '',
        Degree: '',
        Subject: '',
        Batch: '',
        Semester: '',
        JoinedDate: new Date().toISOString().split('T')[0],
        Salary: 60000,
        TotalStudents: 0,
        Email: '',
        Phone: '',
        Password: '',
        Department: '',
        PreviousSchool: '',
      })
    } catch {
      // Toast state is handled by the parent Accounts page.
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className={themeClasses.label}>Full Name *</label>
          <input name="FullName" value={formData.FullName} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between gap-3">
            <label className={themeClasses.label}>Teacher ID *</label>
            <Button type="button" variant="secondary" onClick={handleGenerateTeacherId} className="px-3 py-1 text-xs">
              Generate ID
            </Button>
          </div>
          <input name="TeacherID" value={formData.TeacherID} onChange={handleChange} placeholder="Click Generate ID" required readOnly className={themeClasses.input} />
          <p className="mt-1 text-xs text-slate-500">Generated IDs use the <span className="font-semibold">tch</span> prefix like <span className="font-semibold">tch001</span>.</p>
        </div>
        <div>
          <label className={themeClasses.label}>Degree *</label>
          <input name="Degree" value={formData.Degree} onChange={handleChange} placeholder="e.g., Ph.D. in Computer Science" required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Subject *</label>
          <input name="Subject" value={formData.Subject} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Batch *</label>
          <input name="Batch" value={formData.Batch} onChange={handleChange} placeholder="e.g., Batch 2023, 2024" required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Semester *</label>
          <input name="Semester" value={formData.Semester} onChange={handleChange} placeholder="e.g., 4th, 6th Semester" required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Joined Date *</label>
          <input type="date" name="JoinedDate" value={formData.JoinedDate} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Salary *</label>
          <input type="number" name="Salary" value={formData.Salary} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Total Students *</label>
          <input type="number" name="TotalStudents" value={formData.TotalStudents} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Email *</label>
          <input type="email" name="Email" value={formData.Email} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Phone *</label>
          <input name="Phone" value={formData.Phone} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Password *</label>
          <input type="password" name="Password" value={formData.Password} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Department *</label>
          <input name="Department" value={formData.Department} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Previous School *</label>
          <input name="PreviousSchool" value={formData.PreviousSchool} onChange={handleChange} required className={themeClasses.input} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          Add
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

export default Accounts
