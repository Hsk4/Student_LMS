import React, { useState } from 'react'
import Button from '@/components/common/Button'
import AttendanceSection from '@/components/admin/AttendanceSection'
import MarkAttendanceModal from '@/components/admin/MarkAttendanceModal'
import type { AttendanceRecord } from '@/types/components'
import { dummyAttendance } from '@/data/adminAttendance'

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
