/**
 * Shared component prop types
 * Centralizes all component interfaces to keep .tsx files clean
 */

import React from 'react'

// ============================================================================
// Common Components
// ============================================================================

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  className?: string
  disabled?: boolean
}

export interface AvatarProps {
  src?: string
  alt?: string
  size?: number
}

export interface BadgeProps {
  label: string
  type?: 'default' | 'success' | 'warning' | 'error'
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  contentClassName?: string
  hideCloseButton?: boolean
  fullScreen?: boolean
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  showNumbers?: boolean
}

export interface SearchProps {
  value?: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  onSearch?: (query: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export interface TableProps {
  columns: string[]
  data: Record<string, any>[]
}

export interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

export interface SectionCardProps {
  title: string
  description?: string
  badge?: string
  children: React.ReactNode
  className?: string
  headerClassName?: string
  bodyClassName?: string
  action?: React.ReactNode
}

export interface DataTableColumn<T> {
  header: string
  className?: string
  headerClassName?: string
  render: (row: T) => React.ReactNode
}

export interface DataTableProps<T> {
  columns: Array<DataTableColumn<T>>
  data: T[]
  rowKey: (row: T) => string | number
  emptyMessage?: string
  className?: string
  tableClassName?: string
}

export type AuthMode = 'login' | 'signup'
export type AuthRole = 'admin' | 'teacher' | 'student'

export interface AuthPageProps {
  mode: AuthMode
  role: AuthRole
  title: string
  subtitle: string
  submitLabel: string
  switchLabel: string
  switchHref: string
  onSubmit: (payload: AuthFormValues) => void
}

export interface AuthFormValues {
  fullName?: string
  username?: string
  id?: string
  email: string
  password: string
  confirmPassword?: string
  role: AuthRole
}

// Notes
export interface NoteItem {
  id: string
  title: string
  content: string
  category: string
  updatedAt: string
}

export interface CategoryItem {
  id: string
  name: string
  color: string
}

// Student dashboard
export interface StudentCourse {
  id: string
  code: string
  title: string
  teacher: string
  schedule: string
  progress: number
  assignmentCount: number
}

export interface StudentAssignment {
  id: string
  course: string
  title: string
  dueDate: string
  status: 'Pending' | 'Submitted' | 'Overdue'
}

// Generic table types
export interface Column<T> {
  header: string
  accessor: keyof T
}

export interface GenericTableProps<T> {
  columns: Column<T>[]
  data: T[]
}

// Help tabs
export type HelpTab = 'essentials' | 'templates' | 'markdown' | 'fonts'

// ============================================================================
// Dashboard Components
// ============================================================================

export interface StatCardProps {
  icon: React.ReactNode
  value: string | number
  label: string
  trend?: {
    type: 'up' | 'down' | 'none'
    value: string
  }
  sparkData?: number[]
  children?: React.ReactNode
  iconBgColor?: string
  title?: string
  change?: number
  color?: 'blue' | 'green' | 'purple' | 'orange'
  sparklineData?: number[]
}

export interface MiniSparklineProps {
  data: number[]
}

export interface ActivityFeedProps {
  feed: Array<{
    id: number | string
    type: string
    message: string
    timestamp?: string
    time: string
    bg: string
    color: string
  }>
}

export interface TeachersTableProps {
  teachers: Array<{
    id?: number | string
    name: string
    subject: string
    students?: number
    rating?: number
    status?: 'Active' | 'On Leave'
  }>
}

export interface SubjectPerformanceGaugesProps {
  subjects: Array<{
    id?: number | string
    name: string
    percentage?: number
    percent: number
    color: string
  }>
}

export interface StatRowProps {
  stats: Array<{
    icon: React.ReactNode
    value: string | number
    label: string
    title?: string
    change?: number
    trend?: {
      type: 'up' | 'down' | 'none'
      value: string
    }
    color?: 'blue' | 'green' | 'purple' | 'orange'
    sparkData?: number[]
    sparklineData?: number[]
    children?: React.ReactNode
    iconBgColor?: string
  }>
}

export interface RevenueVsSpendingChartProps {
  data?: Array<{
    month: string
    revenue: number
    spending: number
  }>
  revenue: number[]
  spending: number[]
  months: string[]
}

export interface LeaveRequestsCardProps {
  pending: Array<{
    name?: string
    type?: string
    duration?: string
    date?: string
  }>
}

export interface FeeDonutChartProps {
  paid: number
  pending: number
  total: number
  overdue: number
}

export interface AttendanceHeatmapProps {
  weeks: Array<{
    label: string
    days: string[]
    values: string[]
    week?: number
    data?: Array<{
      day: string
      attendance: number
    }>
  }>
}

// ============================================================================
// Layout Components
// ============================================================================

export interface DashboardLayoutProps {
  children?: React.ReactNode
}

export interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export interface TopbarProps {
  title?: string
  onMenuClick?: () => void
}

export interface UserMenuProps {
  name?: string
  roleLabel?: string
  initials?: string
  userId?: string
  profileHref?: string
  onProfile?: (userId?: string) => void
  onLogout?: () => void
}

// ============================================================================
// Feature Components
// ============================================================================

export interface NotesProps {
  role?: 'student' | 'admin'
}

export interface MarkdownPreviewProps {
  content: string
}

export interface AdminTeacher {
  id: string
  image: string
  name: string
  degree: string
  subject: string
  batch: string
  semester: string
  attendance: number
  joinedDate: string
  salary: number
  totalStudents: number
  status: 'Active' | 'On Leave' | 'Inactive'
  email: string
  phone: string
  experienceYears: number
  department: string
}

export interface AdminTeachersSectionProps {
  teachers: AdminTeacher[]
}

// ============================================================================
// Admin Students
// ============================================================================

export interface AdminStudent {
  id: string
  image: string
  name: string
  studentId: string
  rollNumber: string
  email: string
  phone: string
  password: string
  homeroomTeacher: string
  semesterFees: number
  previousSchool: string
  guardianName: string
  guardianPhone: string
  status: 'Active' | 'Inactive' | 'Suspended'
  gpa: number
  joinDate: string
  class: string
}

export interface AdminStudentsSectionProps {
  students: AdminStudent[]
}

export interface AddStudentModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (student: Omit<AdminStudent, 'id'>) => void
}

// ============================================================================
// Attendance
// ============================================================================

export interface AttendanceRecord {
  id: string
  studentName: string
  studentId: string
  rollNumber: string
  class: string
  date: string
  status: 'Present' | 'Absent' | 'Late' | 'Excused'
  markedBy: string
}

export interface AttendanceSectionProps {
  attendance: AttendanceRecord[]
}

export interface MarkAttendanceModalProps {
  isOpen: boolean
  onClose: () => void
  onMark: (record: Omit<AttendanceRecord, 'id'>) => void
}
