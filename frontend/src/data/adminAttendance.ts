import type { AttendanceRecord } from '@/types/components'

export const dummyAttendance: AttendanceRecord[] = [
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
