import React, { useState } from 'react'
import Button from '@/components/common/Button'
import StudentsSection from '@/components/admin/StudentsSection'
import AddStudentModal from '@/components/admin/AddStudentModal'
import type { AdminStudent } from '@/types/components'

const dummyStudents: AdminStudent[] = [
  {
    id: 's-001',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    name: 'Priya Sharma',
    rollNumber: 'CS-2023-001',
    class: '3rd Year - B.Tech Computer Science',
    email: 'priya.sharma@student.edu',
    phone: '+91-98765-43210',
    guardianName: 'Mr. Rajesh Sharma',
    guardianPhone: '+91-98765-43211',
    status: 'Active',
    gpa: 3.8,
    joinDate: '2023-07-15',
  },
  {
    id: 's-002',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    name: 'Arjun Patel',
    rollNumber: 'CS-2023-002',
    class: '3rd Year - B.Tech Computer Science',
    email: 'arjun.patel@student.edu',
    phone: '+91-98765-43212',
    guardianName: 'Mr. Vikram Patel',
    guardianPhone: '+91-98765-43213',
    status: 'Active',
    gpa: 3.6,
    joinDate: '2023-07-15',
  },
  {
    id: 's-003',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    name: 'Neha Gupta',
    rollNumber: 'CS-2023-003',
    class: '2nd Year - B.Tech Computer Science',
    email: 'neha.gupta@student.edu',
    phone: '+91-98765-43214',
    guardianName: 'Mrs. Anjali Gupta',
    guardianPhone: '+91-98765-43215',
    status: 'Active',
    gpa: 3.9,
    joinDate: '2024-07-15',
  },
]

const Students: React.FC = () => {
  const [students, setStudents] = useState<AdminStudent[]>(dummyStudents)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddStudent = (newStudent: Omit<AdminStudent, 'id'>) => {
    const student: AdminStudent = {
      ...newStudent,
      id: `s-${Date.now()}`,
    }
    setStudents([...students, student])
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Students Management</h1>
          <p className="text-slate-500">Manage student information and records</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="shadow-sm">
          <span>+</span>
          Add New Student
        </Button>
      </div>

      <StudentsSection students={students} />
      <AddStudentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddStudent} />
    </div>
  )
}

export default Students
