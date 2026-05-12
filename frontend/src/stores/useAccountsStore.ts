import { create } from 'zustand'
import type { AdminStudent, AdminTeacher } from '@/types/components'
import { dummyStudents } from '@/data/adminStudents'

type AccountsState = {
  students: AdminStudent[]
  teachers: AdminTeacher[]
  addStudent: (s: Omit<AdminStudent, 'id'>) => void
  // allow providing an optional `id` when creating a teacher from the UI
  addTeacher: (t: Partial<AdminTeacher>) => void
  setStudents: (s: AdminStudent[]) => void
  setTeachers: (t: AdminTeacher[]) => void
}

const initialTeachers: AdminTeacher[] = [
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
]

export const useAccountsStore = create<AccountsState>((set) => ({
  students: dummyStudents,
  teachers: initialTeachers,
  addStudent: (s) =>
    set((state) => {
      const student: AdminStudent = { ...s, id: `s-${Date.now()}` }
      return { students: [student, ...state.students] }
    }),
  addTeacher: (t) =>
    set((state) => {
      const teacher: AdminTeacher = {
        id: (t as AdminTeacher).id && (t as AdminTeacher).id.trim() !== '' ? (t as AdminTeacher).id : `t-${Date.now()}`,
        image: (t as AdminTeacher).image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        name: (t as AdminTeacher).name || 'Unnamed Teacher',
        degree: (t as AdminTeacher).degree || '',
        subject: (t as AdminTeacher).subject || '',
        batch: (t as AdminTeacher).batch || '',
        semester: (t as AdminTeacher).semester || '',
        attendance: (t as AdminTeacher).attendance ?? 0,
        joinedDate: (t as AdminTeacher).joinedDate || new Date().toISOString().split('T')[0],
        salary: (t as AdminTeacher).salary ?? 0,
        totalStudents: (t as AdminTeacher).totalStudents ?? 0,
        status: (t as AdminTeacher).status || 'Active',
        email: (t as AdminTeacher).email || '',
        phone: (t as AdminTeacher).phone || '',
        experienceYears: (t as AdminTeacher).experienceYears ?? 0,
        department: (t as AdminTeacher).department || '',
      }
      return { teachers: [teacher, ...state.teachers] }
    }),
  setStudents: (s) => set(() => ({ students: s })),
  setTeachers: (t) => set(() => ({ teachers: t })),
}))

export default useAccountsStore
