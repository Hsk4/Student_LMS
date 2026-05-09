import React, { useState } from 'react'
import Button from '@/components/common/Button'
import AttendanceSection from '@/components/admin/AttendanceSection'
import MarkAttendanceModal from '@/components/admin/MarkAttendanceModal'
import type { AttendanceRecord } from '@/types/components'

const dummyAttendance: AttendanceRecord[] = [
  {
    id: 'a-001',
    studentName: 'Priya Sharma',
    rollNumber: 'CS-2023-001',
    class: '3rd Year - B.Tech CS',
    date: '2024-01-15',
    status: 'Present',
    markedBy: 'Dr. Aisha Rahman',
  },
  {
    id: 'a-002',
    studentName: 'Arjun Patel',
    rollNumber: 'CS-2023-002',
    class: '3rd Year - B.Tech CS',
    date: '2024-01-15',
    status: 'Present',
    markedBy: 'Dr. Aisha Rahman',
  },
  {
    id: 'a-003',
    studentName: 'Neha Gupta',
    rollNumber: 'CS-2023-003',
    class: '2nd Year - B.Tech CS',
    date: '2024-01-15',
    status: 'Absent',
    markedBy: 'Dr. Aisha Rahman',
  },
  {
    id: 'a-004',
    studentName: 'Priya Sharma',
    rollNumber: 'CS-2023-001',
    class: '3rd Year - B.Tech CS',
    date: '2024-01-16',
    status: 'Present',
    markedBy: 'Dr. Aisha Rahman',
  },
  {
    id: 'a-005',
    studentName: 'Arjun Patel',
    rollNumber: 'CS-2023-002',
    class: '3rd Year - B.Tech CS',
    date: '2024-01-16',
    status: 'Late',
    markedBy: 'Dr. Aisha Rahman',
  },
]

const Attendance: React.FC = () => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(dummyAttendance)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMarkAttendance = (newRecord: Omit<AttendanceRecord, 'id'>) => {
    const record: AttendanceRecord = {
      ...newRecord,
      id: `a-${Date.now()}`,
    }
    setAttendance([...attendance, record])
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Attendance Management</h1>
          <p className="text-slate-500">Track and manage student attendance records</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="shadow-sm">
          <span>+</span>
          Mark Attendance
        </Button>
      </div>

      <AttendanceSection attendance={attendance} />
      <MarkAttendanceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onMark={handleMarkAttendance} />
    </div>
  )
}

export default Attendance
