import React, { useState } from 'react'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import { themeClasses } from '@/styles/theme'
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
      <div className={themeClasses.modalHeader}>
        <h2 className={themeClasses.heading4}>Mark Attendance</h2>
        <p className={themeClasses.textSm}>Record student attendance</p>
      </div>

      <form onSubmit={handleSubmit} className={`${themeClasses.modalBody} space-y-4`}>
          <div>
            <label className={themeClasses.label}>Student Name *</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              className={themeClasses.input}
              placeholder="Enter student name"
            />
          </div>

          <div>
            <label className={themeClasses.label}>Roll Number *</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
              className={themeClasses.input}
              placeholder="e.g., CS-2023-001"
            />
          </div>

          <div>
            <label className={themeClasses.label}>Class *</label>
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
              className={themeClasses.input}
              placeholder="e.g., 3rd Year - B.Tech CS"
            />
          </div>

          <div>
            <label className={themeClasses.label}>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className={themeClasses.input}
            />
          </div>

          <div>
            <label className={themeClasses.label}>Attendance Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={themeClasses.select}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Excused">Excused</option>
            </select>
          </div>

          <div>
            <label className={themeClasses.label}>Marked By *</label>
            <input
              type="text"
              name="markedBy"
              value={formData.markedBy}
              onChange={handleChange}
              required
              className={themeClasses.input}
              placeholder="Teacher/Admin name"
            />
          </div>

          {/* Buttons */}
          <div className={themeClasses.modalFooter}>
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
