import React from 'react'
import { X, Mail, Phone, User, Calendar, DollarSign, School, Clock, GraduationCap, MapPin } from 'lucide-react'
import Modal from '@/components/common/Modal'
import type { AdminStudent } from '@/types/components'
import { themeClasses } from '@/styles/theme'

interface StudentDetailModalProps {
  student: AdminStudent | null
  isOpen: boolean
  onClose: () => void
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, isOpen, onClose }) => {
  if (!isOpen || !student) return null

  return (
    <Modal onClose={onClose}>
      <div style={{ width: '90vw', maxWidth: 700, maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Header with close button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 24, borderBottom: '1px solid #e2e8f0' }}>
          <h2 className="theme-h3">Student Profile</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <X size={24} style={{ color: '#64748b' }} />
          </button>
        </div>

        {/* Profile Content */}
        <div style={{ padding: 24 }}>
          {/* Profile Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #e2e8f0' }}>
            <img
              src={student.image}
              alt={student.name}
              style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '4px solid #4f46e5' }}
            />
            <div style={{ flex: 1 }}>
              <h1 className="theme-h2" style={{ marginBottom: 8 }}>
                {student.name}
              </h1>
              <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${student.status === 'Active' ? themeClasses.badgeSuccess : student.status === 'Suspended' ? themeClasses.badgeDanger : themeClasses.badgeInfo}`}
                >
                  {student.status}
                </span>
                <span className={`${themeClasses.badgeWarning} inline-flex items-center gap-1`}>
                  <GraduationCap size={14} />
                  GPA: {student.gpa.toFixed(2)}
                </span>
              </div>
              <p className="theme-text-sm" style={{ color: '#64748b' }}>
                {student.class}
              </p>
            </div>
          </div>

          {/* Information Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Student ID Section */}
              <div>
                <h3 className="theme-text-sm" style={{ fontWeight: 600, marginBottom: 12, color: '#64748b', textTransform: 'uppercase' }}>
                  Identification
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div
                    className="theme-card"
                    style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
                  >
                    <User size={18} style={{ color: '#4f46e5' }} />
                    <div>
                      <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                        Student ID
                      </p>
                      <p className="theme-text-base" style={{ fontWeight: 600 }}>
                        {student.studentId}
                      </p>
                    </div>
                  </div>
                  <div
                    className="theme-card"
                    style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
                  >
                    <GraduationCap size={18} style={{ color: '#7c3aed' }} />
                    <div>
                      <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                        Roll Number
                      </p>
                      <p className="theme-text-base" style={{ fontWeight: 600 }}>
                        {student.rollNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="theme-text-sm" style={{ fontWeight: 600, marginBottom: 12, color: '#64748b', textTransform: 'uppercase' }}>
                  Contact Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div
                    className="theme-card"
                    style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
                  >
                    <Mail size={18} style={{ color: '#06b6d4' }} />
                    <div>
                      <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                        Email
                      </p>
                      <a
                        href={`mailto:${student.email}`}
                        className="theme-text-base"
                        style={{ fontWeight: 600, color: '#4f46e5', textDecoration: 'none' }}
                      >
                        {student.email}
                      </a>
                    </div>
                  </div>
                  <div
                    className="theme-card"
                    style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
                  >
                    <Phone size={18} style={{ color: '#f59e0b' }} />
                    <div>
                      <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                        Phone
                      </p>
                      <a
                        href={`tel:${student.phone}`}
                        className="theme-text-base"
                        style={{ fontWeight: 600, color: '#4f46e5', textDecoration: 'none' }}
                      >
                        {student.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Academic Information */}
              <div>
                <h3 className="theme-text-sm" style={{ fontWeight: 600, marginBottom: 12, color: '#64748b', textTransform: 'uppercase' }}>
                  Academic Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div
                    className="theme-card"
                    style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
                  >
                    <User size={18} style={{ color: '#10b981' }} />
                    <div>
                      <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                        Homeroom Teacher
                      </p>
                      <p className="theme-text-base" style={{ fontWeight: 600 }}>
                        {student.homeroomTeacher}
                      </p>
                    </div>
                  </div>
                  <div
                    className="theme-card"
                    style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
                  >
                    <Clock size={18} style={{ color: '#ec4899' }} />
                    <div>
                      <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                        Portal Timing
                      </p>
                      <p className="theme-text-base" style={{ fontWeight: 600 }}>
                        {student.signOnTime} - {student.signOffTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="theme-text-sm" style={{ fontWeight: 600, marginBottom: 12, color: '#64748b', textTransform: 'uppercase' }}>
                  Financial Information
                </h3>
                <div
                  className="theme-card"
                  style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
                >
                  <DollarSign size={18} style={{ color: '#8b5cf6' }} />
                  <div>
                    <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                      Semester Fees (Fixed)
                    </p>
                    <p className="theme-text-base" style={{ fontWeight: 600 }}>
                      ₹{student.semesterFees.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #e2e8f0' }}>
            <h3 className="theme-text-sm" style={{ fontWeight: 600, marginBottom: 12, color: '#64748b', textTransform: 'uppercase' }}>
              Additional Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div
                className="theme-card"
                style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
              >
                <School size={18} style={{ color: '#06b6d4' }} />
                <div>
                  <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                    Previous School
                  </p>
                  <p className="theme-text-base" style={{ fontWeight: 600 }}>
                    {student.previousSchool}
                  </p>
                </div>
              </div>
              <div
                className="theme-card"
                style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
              >
                <Calendar size={18} style={{ color: '#f59e0b' }} />
                <div>
                  <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                    Joined Date
                  </p>
                  <p className="theme-text-base" style={{ fontWeight: 600 }}>
                    {new Date(student.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div style={{ marginTop: 24, padding: 16, backgroundColor: '#eff6ff', borderRadius: 8, border: '1px solid #bfdbfe' }}>
            <h3 className="theme-text-sm" style={{ fontWeight: 600, marginBottom: 12, color: '#1e40af' }}>
              Guardian Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <p className="theme-text-xs" style={{ color: '#3b82f6', marginBottom: 4 }}>
                  Guardian Name
                </p>
                <p className="theme-text-base" style={{ fontWeight: 600, color: '#1e3a8a' }}>
                  {student.guardianName}
                </p>
              </div>
              <div>
                <p className="theme-text-xs" style={{ color: '#3b82f6', marginBottom: 4 }}>
                  Guardian Phone
                </p>
                <a
                  href={`tel:${student.guardianPhone}`}
                  className="theme-text-base"
                  style={{ fontWeight: 600, color: '#1e40af', textDecoration: 'none' }}
                >
                  {student.guardianPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default StudentDetailModal
