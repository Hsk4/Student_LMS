import React, { useState } from 'react'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import { themeClasses } from '@/styles/theme'
import type { AddStudentModalProps, AdminStudent } from '@/types/components'

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    class: '',
    email: '',
    phone: '',
    guardianName: '',
    guardianPhone: '',
    status: 'Active' as const,
    gpa: 3.5,
    joinDate: new Date().toISOString().split('T')[0],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'gpa' ? parseFloat(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData as Omit<AdminStudent, 'id'>)
    setFormData({
      name: '',
      rollNumber: '',
      class: '',
      email: '',
      phone: '',
      guardianName: '',
      guardianPhone: '',
      status: 'Active',
      gpa: 3.5,
      joinDate: new Date().toISOString().split('T')[0],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    })
  }

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClassName="max-w-2xl overflow-hidden">
      <div className={themeClasses.modalHeader}>
        <h2 className={themeClasses.heading4}>Add New Student</h2>
        <p className={themeClasses.textSm}>Fill in the student details below</p>
      </div>

      <form onSubmit={handleSubmit} className={`${themeClasses.modalBody} space-y-6`}>
          {/* Personal Information */}
          <div>
            <h3 className={themeClasses.heading5}>Personal Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={themeClasses.label}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
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
                <label className={themeClasses.label}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={themeClasses.input}
                  placeholder="student@email.com"
                />
              </div>
              <div>
                <label className={themeClasses.label}>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={themeClasses.input}
                  placeholder="+91-98765-43210"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className={themeClasses.heading5}>Academic Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                <label className={themeClasses.label}>GPA *</label>
                <input
                  type="number"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleChange}
                  required
                  min="0"
                  max="4"
                  step="0.1"
                  className={themeClasses.input}
                  placeholder="3.5"
                />
              </div>
              <div>
                <label className={themeClasses.label}>Join Date *</label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  required
                  className={themeClasses.input}
                />
              </div>
              <div>
                <label className={themeClasses.label}>Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={themeClasses.select}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div>
            <h3 className={themeClasses.heading5}>Guardian Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={themeClasses.label}>Guardian Name *</label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  required
                  className={themeClasses.input}
                  placeholder="Guardian's full name"
                />
              </div>
              <div>
                <label className={themeClasses.label}>Guardian Phone *</label>
                <input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  required
                  className={themeClasses.input}
                  placeholder="+91-98765-43211"
                />
              </div>
            </div>
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
              Add Student
            </Button>
          </div>
        </form>
    </Modal>
  )
}

export default AddStudentModal
