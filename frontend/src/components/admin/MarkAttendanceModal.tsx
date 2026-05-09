import React, { useState } from 'react'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import type { MarkAttendanceModalProps, AttendanceRecord } from '@/types/components'

const MarkAttendanceModal: React.FC<MarkAttendanceModalProps> = ({ isOpen, onClose, onMark }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    class: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present' as const,
    markedBy: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onMark(formData as Omit<AttendanceRecord, 'id'>)
    setFormData({
      studentName: '',
      rollNumber: '',
      class: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Present',
      markedBy: '',
    })
  }

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClassName="max-w-md overflow-hidden">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-900">Mark Attendance</h2>
        <p className="text-sm text-slate-500">Record student attendance</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Student Name *</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Enter student name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Roll Number *</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="e.g., CS-2023-001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Class *</label>
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="e.g., 3rd Year - B.Tech CS"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Attendance Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Excused">Excused</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Marked By *</label>
            <input
              type="text"
              name="markedBy"
              value={formData.markedBy}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Teacher/Admin name"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 border-t border-slate-200 pt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Mark Attendance
            </Button>
          </div>
        </form>
    </Modal>
  )
}

export default MarkAttendanceModal
