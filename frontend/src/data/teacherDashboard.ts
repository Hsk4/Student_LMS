export type TeacherClass = {
  id: string
  code: string
  title: string
  section: string
  schedule: string
  room: string
  students: number
  status: 'Teaching' | 'Planning' | 'Review'
}

export type TeacherStudent = {
  id: string
  name: string
  classId: string
  rollNumber: string
  studentId: string
  email: string
  performance: number
  status: 'Active' | 'Needs Help' | 'At Risk'
}

export type TeacherQuiz = {
  id: string
  title: string
  classId: string
  dueDate: string
  mode: 'MCQ' | 'Short Answer' | 'Mixed'
  questions: number
}

export type TeacherNote = {
  id: string
  title: string
  audience: 'Class' | 'Parent' | 'Department'
  content: string
  updatedAt: string
}

export type TeacherReminder = {
  id: string
  title: string
  detail: string
  dueAt: string
  priority: 'High' | 'Normal' | 'Low'
}

export const taughtClasses: TeacherClass[] = [
  {
    id: 'cls-11a',
    code: 'CS-11A',
    title: 'Computer Fundamentals',
    section: 'Grade 11A',
    schedule: 'Mon / Wed / Fri · 9:00 AM',
    room: 'Lab 2',
    students: 32,
    status: 'Teaching',
  },
  {
    id: 'cls-12b',
    code: 'CS-12B',
    title: 'Data Structures',
    section: 'Grade 12B',
    schedule: 'Tue / Thu · 11:15 AM',
    room: 'Room 204',
    students: 28,
    status: 'Teaching',
  },
  {
    id: 'cls-10c',
    code: 'CS-10C',
    title: 'Programming Basics',
    section: 'Grade 10C',
    schedule: 'Sat · 10:30 AM',
    room: 'Lab 1',
    students: 30,
    status: 'Planning',
  },
]

export const studyClasses: TeacherClass[] = [
  {
    id: 'study-ai',
    code: 'PD-201',
    title: 'AI in Education Workshop',
    section: 'Teacher Development',
    schedule: 'Thu · 4:00 PM',
    room: 'Conference Hall',
    students: 18,
    status: 'Review',
  },
  {
    id: 'study-assessment',
    code: 'PD-140',
    title: 'Assessment Design Lab',
    section: 'Teacher Development',
    schedule: 'Sun · 3:00 PM',
    room: 'Online',
    students: 12,
    status: 'Planning',
  },
]

export const initialTeacherStudents: TeacherStudent[] = [
  {
    id: 'stu-101',
    name: 'Aarav Patel',
    classId: 'cls-11a',
    rollNumber: '11-01',
    studentId: 'STU-1101',
    email: 'aarav.patel@school.edu',
    performance: 88,
    status: 'Active',
  },
  {
    id: 'stu-102',
    name: 'Mira Shah',
    classId: 'cls-11a',
    rollNumber: '11-02',
    studentId: 'STU-1102',
    email: 'mira.shah@school.edu',
    performance: 74,
    status: 'Needs Help',
  },
  {
    id: 'stu-201',
    name: 'Rohan Mehta',
    classId: 'cls-12b',
    rollNumber: '12-05',
    studentId: 'STU-1205',
    email: 'rohan.mehta@school.edu',
    performance: 91,
    status: 'Active',
  },
  {
    id: 'stu-202',
    name: 'Sara Khan',
    classId: 'cls-12b',
    rollNumber: '12-09',
    studentId: 'STU-1209',
    email: 'sara.khan@school.edu',
    performance: 69,
    status: 'At Risk',
  },
]

export const initialQuizzes: TeacherQuiz[] = [
  {
    id: 'quiz-1',
    title: 'Binary Basics Quiz',
    classId: 'cls-11a',
    dueDate: '2026-05-18',
    mode: 'MCQ',
    questions: 10,
  },
  {
    id: 'quiz-2',
    title: 'Stacks & Queues Checkpoint',
    classId: 'cls-12b',
    dueDate: '2026-05-22',
    mode: 'Mixed',
    questions: 12,
  },
]

export const initialNotes: TeacherNote[] = [
  {
    id: 'note-1',
    title: 'Lesson flow for next week',
    audience: 'Class',
    content: 'Start with a quick recap, then move to group practice and exit tickets.',
    updatedAt: '2026-05-12T09:20:00Z',
  },
  {
    id: 'note-2',
    title: 'Parent follow-up list',
    audience: 'Parent',
    content: 'Contact guardians for students with low assignment completion this week.',
    updatedAt: '2026-05-11T13:00:00Z',
  },
]

export const initialReminders: TeacherReminder[] = [
  {
    id: 'rem-1',
    title: 'Collect quiz papers',
    detail: 'Review Grade 11A paper submissions before Friday.',
    dueAt: '2026-05-16T10:00:00Z',
    priority: 'High',
  },
  {
    id: 'rem-2',
    title: 'Upload progress notes',
    detail: 'Share class progress summary with the department.',
    dueAt: '2026-05-19T17:00:00Z',
    priority: 'Normal',
  },
]
