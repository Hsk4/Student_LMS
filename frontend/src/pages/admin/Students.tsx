import React from 'react'
import StudentsSection from '@/components/admin/StudentsSection'
import { dummyStudents } from '@/data/adminStudents'

const Students: React.FC = () => {
  const students = dummyStudents


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Students Management</h1>
          <p className="text-slate-500">Manage student information and records</p>
        </div>
      </div>

      <StudentsSection students={students} />
    </div>
  )
}

export default Students
