import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '@/components/common/Button'
import { dummyStudents } from '@/data/adminStudents'
import type { AdminStudent, AdminTeacher } from '@/types/components'
import { themeClasses } from '@/styles/theme'
import { Search } from 'lucide-react'

const Accounts: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [students, setStudents] = useState<AdminStudent[]>(dummyStudents)
  const [teachers, setTeachers] = useState<AdminTeacher[]>([
    {
      id: 't-001',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      name: 'Dr. Aisha Rahman',
      degree: 'Ph.D. in Computer Science',
      subject: 'Data Structures',
      batch: 'Batch 2023',
      semester: '6th Semester',
      attendance: 95,
      joinedDate: '2020-08-15',
      salary: 75000,
      totalStudents: 45,
      status: 'Active',
      email: 'aisha.rahman@academics.edu',
      phone: '+91-98765-43210',
      experienceYears: 9,
      department: 'Computer Science Department',
    },
    {
      id: 't-002',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      name: 'Prof. Rajesh Kumar',
      degree: 'M.Tech in Software Engineering',
      subject: 'Database Management',
      batch: 'Batch 2023, 2024',
      semester: '4th, 6th Semester',
      attendance: 88,
      joinedDate: '2019-06-10',
      salary: 65000,
      totalStudents: 60,
      status: 'Active',
      email: 'rajesh.kumar@academics.edu',
      phone: '+91-98765-43211',
      experienceYears: 12,
      department: 'Computer Science Department',
    },
  ])

  const [activeForm, setActiveForm] = useState<'student' | 'teacher' | null>(null)
  const [userType, setUserType] = useState<'all' | 'students' | 'teachers'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Inactive'>('all')

  // Auto-open form if sidebar link is clicked
  useEffect(() => {
    const formType = searchParams.get('form')
    if (formType === 'student' || formType === 'teacher') {
      setActiveForm(formType)
    }
  }, [searchParams])

  const handleAddStudent = (newStudent: Omit<AdminStudent, 'id'>) => {
    const student: AdminStudent = { ...newStudent, id: `s-${Date.now()}` }
    setStudents((s) => [...s, student])
    setActiveForm(null)
  }

  const handleAddTeacher = (newTeacher: Omit<AdminTeacher, 'id'>) => {
    const teacher: AdminTeacher = { ...newTeacher, id: `t-${Date.now()}` }
    setTeachers((t) => [...t, teacher])
    setActiveForm(null)
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

/* Small inline Add Student form (moved from AddStudentModal) */
const StudentAddForm: React.FC<{ onAdd: (s: Omit<AdminStudent, 'id'>) => void; onCancel?: () => void }> = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    rollNumber: '',
    email: '',
    phone: '',
    password: '',
    homeroomTeacher: '',
    semesterFees: 15000,
    previousSchool: '',
    class: '',
    guardianName: '',
    guardianPhone: '',
    status: 'Active' as const,
    gpa: 3.5,
    joinDate: new Date().toISOString().split('T')[0],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === 'gpa' || name === 'semesterFees' ? parseFloat(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({
      name: '',
      studentId: '',
      rollNumber: '',
      email: '',
      phone: '',
      password: '',
      homeroomTeacher: '',
      semesterFees: 15000,
      previousSchool: '',
      class: '',
      guardianName: '',
      guardianPhone: '',
      status: 'Active',
      gpa: 3.5,
      joinDate: new Date().toISOString().split('T')[0],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className={themeClasses.label}>Full Name *</label>
          <input name="name" value={formData.name} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Student ID *</label>
          <input name="studentId" value={formData.studentId} onChange={handleChange} placeholder="e.g., STU-2023-001" required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Roll Number *</label>
          <input name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="e.g., 001" required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Email *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Phone *</label>
          <input name="phone" value={formData.phone} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Password *</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Homeroom Teacher *</label>
          <input name="homeroomTeacher" value={formData.homeroomTeacher} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Semester Fees *</label>
          <input type="number" name="semesterFees" value={formData.semesterFees} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Previous School *</label>
          <input name="previousSchool" value={formData.previousSchool} onChange={handleChange} required className={themeClasses.input} />
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

/* Small inline Add Teacher form */
const TeacherAddForm: React.FC<{ onAdd: (t: Omit<AdminTeacher, 'id'>) => void; onCancel?: () => void }> = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    subject: '',
    batch: '',
    semester: '',
    attendance: 85,
    joinedDate: new Date().toISOString().split('T')[0],
    salary: 60000,
    totalStudents: 0,
    email: '',
    phone: '',
    status: 'Active' as const,
    experienceYears: 1,
    department: '',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'experienceYears' || name === 'attendance' || name === 'salary' || name === 'totalStudents' ? parseFloat(value || '0') : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({
      name: '',
      degree: '',
      subject: '',
      batch: '',
      semester: '',
      attendance: 85,
      joinedDate: new Date().toISOString().split('T')[0],
      salary: 60000,
      totalStudents: 0,
      email: '',
      phone: '',
      status: 'Active',
      experienceYears: 1,
      department: '',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className={themeClasses.label}>Full Name *</label>
          <input name="name" value={formData.name} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Degree *</label>
          <input name="degree" value={formData.degree} onChange={handleChange} placeholder="e.g., Ph.D. in Computer Science" required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Subject *</label>
          <input name="subject" value={formData.subject} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Batch *</label>
          <input name="batch" value={formData.batch} onChange={handleChange} placeholder="e.g., Batch 2023, 2024" required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Semester *</label>
          <input name="semester" value={formData.semester} onChange={handleChange} placeholder="e.g., 4th, 6th Semester" required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Attendance % *</label>
          <input type="number" name="attendance" value={formData.attendance} onChange={handleChange} min="0" max="100" required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Joined Date *</label>
          <input type="date" name="joinedDate" value={formData.joinedDate} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Salary *</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Total Students *</label>
          <input type="number" name="totalStudents" value={formData.totalStudents} onChange={handleChange} required className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} className={themeClasses.input} />
        </div>
        <div>
          <label className={themeClasses.label}>Department</label>
          <input name="department" value={formData.department} onChange={handleChange} className={themeClasses.input} />
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
