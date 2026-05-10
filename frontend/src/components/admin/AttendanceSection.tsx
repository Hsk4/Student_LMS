import React, { useState } from 'react'
import { Calendar, Filter, Search } from 'lucide-react'
import { StatCard } from '@/components/charts/StatCard'
import Button from '@/components/common/Button'
import DataTable from '@/components/common/DataTable'
import SectionCard from '@/components/common/SectionCard'
import { themeClasses } from '@/styles/theme'
import type { AttendanceSectionProps, DataTableColumn } from '@/types/components'

const AttendanceSection: React.FC<AttendanceSectionProps> = ({ attendance }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const filteredAttendance = attendance.filter((record) => {
    const searchLower = searchQuery.toLowerCase()
    const searchMatch =
      !searchQuery ||
      record.studentName.toLowerCase().includes(searchLower) ||
      record.studentId.toLowerCase().includes(searchLower) ||
      record.rollNumber.toLowerCase().includes(searchLower)
    const dateMatch = !selectedDate || record.date === selectedDate
    const statusMatch = selectedStatus === 'All' || record.status === selectedStatus
    const categoryMatch = selectedCategory === 'All' || record.class === selectedCategory
    return searchMatch && dateMatch && statusMatch && categoryMatch
  })

  // Get unique categories from attendance data
  const categories = ['All', ...new Set(attendance.map((r) => r.class))]

  const stats = {
    total: filteredAttendance.length,
    present: filteredAttendance.filter((r) => r.status === 'Present').length,
    absent: filteredAttendance.filter((r) => r.status === 'Absent').length,
    late: filteredAttendance.filter((r) => r.status === 'Late').length,
    excused: filteredAttendance.filter((r) => r.status === 'Excused').length,
  }

  const attendancePercentage =
    stats.total > 0 ? Math.round(((stats.present + stats.excused) / stats.total) * 100) : 0

  const metricCards = [
    {
      label: 'Total Records',
      value: stats.total,
      icon: <Calendar size={18} />,
      iconBgColor: 'bg-slate-100',
    },
    {
      label: 'Present',
      value: stats.present,
      icon: <span className="text-sm font-bold">P</span>,
      iconBgColor: 'bg-green-100',
    },
    {
      label: 'Absent',
      value: stats.absent,
      icon: <span className="text-sm font-bold">A</span>,
      iconBgColor: 'bg-red-100',
    },
    {
      label: 'Late',
      value: stats.late,
      icon: <span className="text-sm font-bold">L</span>,
      iconBgColor: 'bg-amber-100',
    },
  ]

  const columns: DataTableColumn<AttendanceSectionProps['attendance'][number]>[] = [
    { header: 'Student Name', render: (record: AttendanceSectionProps['attendance'][number]) => <span className="font-medium text-slate-900">{record.studentName}</span> },
    { header: 'Student ID', className: 'whitespace-nowrap', render: (record: AttendanceSectionProps['attendance'][number]) => <span className="font-mono text-slate-700">{record.studentId}</span> },
    { header: 'Roll Number', className: 'whitespace-nowrap', render: (record: AttendanceSectionProps['attendance'][number]) => <span className="font-mono text-slate-700">{record.rollNumber}</span> },
    { header: 'Class', render: (record: AttendanceSectionProps['attendance'][number]) => <span className="text-slate-600">{record.class}</span> },
    { header: 'Date', className: 'whitespace-nowrap', render: (record: AttendanceSectionProps['attendance'][number]) => <span className="text-slate-600">{record.date}</span> },
    {
      header: 'Status',
      render: (record: AttendanceSectionProps['attendance'][number]) => (
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
            record.status === 'Present'
              ? 'bg-green-100 text-green-700'
              : record.status === 'Absent'
                ? 'bg-red-100 text-red-700'
                : record.status === 'Late'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-blue-100 text-blue-700'
          }`}
        >
          {record.status}
        </span>
      ),
    },
    { header: 'Marked By', render: (record: AttendanceSectionProps['attendance'][number]) => <span className="text-slate-600">{record.markedBy}</span> },
  ]

  return (
    <SectionCard
      title="Attendance Records"
      description="Student attendance tracking and management"
      badge={`${attendancePercentage}% Overall`}
    >
      <div className="px-6 pt-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {metricCards.map((card, index) => (
            <StatCard
              key={card.label}
              icon={card.icon}
              value={card.value}
              label={card.label}
              iconBgColor={card.iconBgColor}
              trend={index === 0 ? { type: 'none', value: '' } : undefined}
            />
          ))}
          <div className={`${themeClasses.dashboardCardShell} p-4 text-center`}>
            <p className="text-2xl font-bold text-indigo-600">{attendancePercentage}%</p>
            <p className="text-xs text-slate-500">Overall Attendance</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 px-6 pt-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by student name, student ID, or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 md:flex-row md:gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={themeClasses.select}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-500" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={themeClasses.select}
            >
              <option value="All">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Excused">Excused</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-slate-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={themeClasses.input}
            />
          </div>
        </div>
        {(searchQuery || selectedDate || selectedStatus !== 'All' || selectedCategory !== 'All') && (
          <Button
            onClick={() => {
              setSearchQuery('')
              setSelectedDate('')
              setSelectedStatus('All')
              setSelectedCategory('All')
            }}
            variant="secondary"
            className="px-3 py-2 text-sm"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="px-6 pb-6">
        <DataTable
          columns={columns}
          data={filteredAttendance}
          rowKey={(record) => record.id}
          emptyMessage="No attendance records found"
          tableClassName="min-w-[920px]"
        />
      </div>
    </SectionCard>
  )
}

export default AttendanceSection
