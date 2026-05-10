import type { StudentCourse, StudentAssignment } from '@/types/components'

export const courses: StudentCourse[] = [
  {
    id: 'c-1',
    code: 'CS201',
    title: 'Introduction to Programming',
    teacher: 'Dr. Naveed A. Malik',
    schedule: 'Mon / Wed / Fri · 9:00 AM',
    progress: 78,
    assignmentCount: 3,
  },
  {
    id: 'c-2',
    code: 'CS214',
    title: 'Data Structures',
    teacher: 'Prof. Sarah Ahmed',
    schedule: 'Tue / Thu · 11:00 AM',
    progress: 64,
    assignmentCount: 2,
  },
  {
    id: 'c-3',
    code: 'MTH210',
    title: 'Discrete Mathematics',
    teacher: 'Dr. Faisal Khan',
    schedule: 'Mon / Thu · 1:30 PM',
    progress: 51,
    assignmentCount: 1,
  },
]

export const assignments: StudentAssignment[] = [
  {
    id: 'a-1',
    course: 'CS201',
    title: 'Looping Practice Sheet',
    dueDate: '2026-05-12',
    status: 'Pending',
  },
  {
    id: 'a-2',
    course: 'CS214',
    title: 'Linked List Implementation',
    dueDate: '2026-05-10',
    status: 'Overdue',
  },
  {
    id: 'a-3',
    course: 'MTH210',
    title: 'Logic Propositions Quiz',
    dueDate: '2026-05-14',
    status: 'Submitted',
  },
]
