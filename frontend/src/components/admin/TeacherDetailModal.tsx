import React from 'react'
import { X, Mail, Phone, User, Calendar, DollarSign, Users, TrendingUp, BookOpen, Award } from 'lucide-react'
import Modal from '@/components/common/Modal'
import type { AdminTeacher } from '@/types/components'
import { themeClasses } from '@/styles/theme'

interface TeacherDetailModalProps {
  teacher: AdminTeacher | null
  isOpen: boolean
  onClose: () => void
}

const TeacherDetailModal: React.FC<TeacherDetailModalProps> = ({ teacher, isOpen, onClose }) => {
  if (!isOpen || !teacher) return null

  return (
    <Modal onClose={onClose}>
      <div style={{ width: '90vw', maxWidth: 700, maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Header with close button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 24, borderBottom: '1px solid #e2e8f0' }}>
          <h2 className="theme-h3">Teacher Profile</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <X size={24} style={{ color: '#64748b' }} />
          </button>
        </div>

        {/* Profile Content */}
        <div style={{ padding: 24 }}>
          {/* Profile Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #e2e8f0' }}>
            <img
              src={teacher.image}
              alt={teacher.name}
              style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '4px solid #4f46e5' }}
            />
            <div style={{ flex: 1 }}>
              <h1 className="theme-h2" style={{ marginBottom: 8 }}>
                {teacher.name}
              </h1>
              <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${teacher.status === 'Active' ? themeClasses.badgeSuccess : teacher.status === 'On Leave' ? themeClasses.badgeWarning : themeClasses.badgeInfo}`}
                >
                  {teacher.status}
                </span>
                <span className={`${themeClasses.badgeWarning} inline-flex items-center gap-1`}>
                  <TrendingUp size={14} />
                  {teacher.attendance}% Attendance
                </span>
              </div>
              <p className="theme-text-sm" style={{ color: '#64748b' }}>
                {teacher.degree}
              </p>
            </div>
          </div>

          {/* Information Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Professional Information */}
              <div>
                <h3 className="theme-text-sm" style={{ fontWeight: 600, marginBottom: 12, color: '#64748b', textTransform: 'uppercase' }}>
                  Professional Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div
                    className="theme-card"
                    style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
                  >
                    <BookOpen size={18} style={{ color: '#4f46e5' }} />
                    <div>
                      <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                        Subject
                      </p>
                      <p className="theme-text-base" style={{ fontWeight: 600 }}>
                        {teacher.subject}
                      </p>
                    </div>
                  </div>
                  <div
                    className="theme-card"
                    style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
                  >
                    <Award size={18} style={{ color: '#7c3aed' }} />
                    <div>
                      <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                        Department
                      </p>
                      <p className="theme-text-base" style={{ fontWeight: 600 }}>
                        {teacher.department}
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
                        href={`mailto:${teacher.email}`}
                        className="theme-text-base"
                        style={{ fontWeight: 600, color: '#4f46e5', textDecoration: 'none' }}
                      >
                        {teacher.email}
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
                        href={`tel:${teacher.phone}`}
                        className="theme-text-base"
                        style={{ fontWeight: 600, color: '#4f46e5', textDecoration: 'none' }}
                      >
                        {teacher.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Teaching Information */}
              <div>
                <h3 className="theme-text-sm" style={{ fontWeight: 600, marginBottom: 12, color: '#64748b', textTransform: 'uppercase' }}>
                  Teaching Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div
                    className="theme-card"
                    style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
                  >
                    <Users size={18} style={{ color: '#10b981' }} />
                    <div>
                      <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                        Total Students
                      </p>
                      <p className="theme-text-base" style={{ fontWeight: 600 }}>
                        {teacher.totalStudents} Students
                      </p>
                    </div>
                  </div>
                  <div
                    className="theme-card"
                    style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
                  >
                    <Users size={18} style={{ color: '#ec4899' }} />
                    <div>
                      <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                        Batch
                      </p>
                      <p className="theme-text-base" style={{ fontWeight: 600 }}>
                        {teacher.batch}
                      </p>
                    </div>
                  </div>
                  <div
                    className="theme-card"
                    style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
                  >
                    <BookOpen size={18} style={{ color: '#06b6d4' }} />
                    <div>
                      <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                        Semester
                      </p>
                      <p className="theme-text-base" style={{ fontWeight: 600 }}>
                        {teacher.semester}
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
                      Salary
                    </p>
                    <p className="theme-text-base" style={{ fontWeight: 600 }}>
                      ₹{teacher.salary.toLocaleString()}
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
                <Calendar size={18} style={{ color: '#f59e0b' }} />
                <div>
                  <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                    Joined Date
                  </p>
                  <p className="theme-text-base" style={{ fontWeight: 600 }}>
                    {new Date(teacher.joinedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div
                className="theme-card"
                style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc' }}
              >
                <TrendingUp size={18} style={{ color: '#10b981' }} />
                <div>
                  <p className="theme-text-xs" style={{ color: '#64748b', marginBottom: 4 }}>
                    Experience
                  </p>
                  <p className="theme-text-base" style={{ fontWeight: 600 }}>
                    {teacher.experienceYears} Years
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Information */}
          <div style={{ marginTop: 24, padding: 16, backgroundColor: '#ecfdf5', borderRadius: 8, border: '1px solid #d1fae5' }}>
            <h3 className="theme-text-sm" style={{ fontWeight: 600, marginBottom: 12, color: '#065f46' }}>
              Attendance Record
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    width: '100%',
                    height: 24,
                    backgroundColor: '#d1fae5',
                    borderRadius: 12,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${teacher.attendance}%`,
                      height: '100%',
                      backgroundColor: '#10b981',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>
              <p className="theme-text-base" style={{ fontWeight: 600, color: '#065f46', minWidth: 60 }}>
                {teacher.attendance}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TeacherDetailModal
