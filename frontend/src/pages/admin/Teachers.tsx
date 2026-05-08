import React from 'react'
import TeachersSection from '@/components/admin/TeachersSection'
import type { AdminTeacher } from '@/types/components'

const dummyTeachers: AdminTeacher[] = [
  {
    id: 't-001',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    name: 'Dr. Aisha Rahman',
    degree: 'Ph.D. in Computer Science',
    subject: 'Data Structures',
    status: 'Active',
    email: 'aisha.rahman@academics.edu',
    phone: '+91-98765-43210',
    experienceYears: 9,
    department: 'Computer Science Department',
  },
]

const Teachers: React.FC = () => {
  return <TeachersSection teachers={dummyTeachers} />
}

export default Teachers
