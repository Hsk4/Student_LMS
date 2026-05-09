import { CalendarDays, GraduationCap, ClipboardList, BookOpen } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'
import Badge from '@/components/common/Badge'
import DataTable from '@/components/common/DataTable'
import type { DataTableColumn } from '@/types/components'
import { Link } from 'react-router-dom'

type StudentCourse = {
  id: string
  code: string
  title: string
  teacher: string
  schedule: string
  progress: number
  assignmentCount: number
}

type StudentAssignment = {
  id: string
  course: string
  title: string
  dueDate: string
  status: 'Pending' | 'Submitted' | 'Overdue'
}

const courses: StudentCourse[] = [
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

const assignments: StudentAssignment[] = [
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

export default function StudentDashboard() {
  const studentName = localStorage.getItem('studentName') || 'John Doe'

  const assignmentColumns: DataTableColumn<StudentAssignment>[] = [
    {
      header: 'Course',
      render: (assignment) => <span className="font-mono text-slate-700">{assignment.course}</span>,
    },
    {
      header: 'Assignment',
      className: 'min-w-[220px]',
      render: (assignment) => <span className="font-medium text-slate-900">{assignment.title}</span>,
    },
    {
      header: 'Due Date',
      render: (assignment) => <span className="text-slate-600">{assignment.dueDate}</span>,
    },
    {
      header: 'Status',
      render: (assignment) => (
        <Badge
          label={assignment.status}
          type={assignment.status === 'Submitted' ? 'success' : assignment.status === 'Overdue' ? 'error' : 'warning'}
        />
      ),
    },
  ]

  return (
    <div className="space-y-6 p-4 md:p-8">
      <section className="rounded-3xl bg-linear-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-[0_18px_40px_rgba(79,70,229,0.2)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">Welcome</p>
            <h1 className="mt-2 text-3xl font-bold">Welcome, {studentName}!</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85">
              See what you're studying now, who is teaching it, and the assignments waiting for you.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">Courses</p>
              <p className="mt-1 text-2xl font-bold">{courses.length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">Assignments</p>
              <p className="mt-1 text-2xl font-bold">{assignments.length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">Progress</p>
              <p className="mt-1 text-2xl font-bold">64%</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard
          title="My Courses"
          description="Courses currently assigned to you"
          badge={`${courses.length} Active`}
        >
          <div className="grid gap-4 p-6">
            {courses.map((course) => (
              <article key={course.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                          {course.code}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">Teacher: {course.teacher}</p>
                      <p className="mt-1 text-sm text-slate-500">{course.schedule}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 md:min-w-55">
                    <div className="rounded-xl bg-white px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Progress</p>
                      <p className="mt-1 text-2xl font-bold text-slate-900">{course.progress}%</p>
                    </div>
                    <div className="rounded-xl bg-white px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Assignments</p>
                      <p className="mt-1 text-2xl font-bold text-slate-900">{course.assignmentCount}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex items-center gap-6">
                    <Link to={`/student/assignments?course=${course.code}`} className="flex items-center flex-col text-sm text-slate-600 hover:text-indigo-600">
                      <div className="rounded-full bg-white p-3 shadow-sm">
                        <BookOpen size={20} />
                      </div>
                      <span className="mt-2 text-xs">Assignments</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Quick Overview"
          description="Your class at a glance"
          badge="Today"
          action={<Badge label="Live" type="success" />}
          bodyClassName="p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-700">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Next class</p>
                  <p className="text-sm text-slate-500">Algorithms · 10:30 AM</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Attendance</p>
                  <p className="text-sm text-slate-500">92% this semester</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:col-span-2 xl:col-span-1">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                  <ClipboardList size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Pending work</p>
                  <p className="text-sm text-slate-500">2 assignments need attention before the weekend.</p>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Assignments for You" description="Tasks linked to your enrolled courses" badge={`${assignments.length} total`}>
        <div className="p-6">
          <DataTable
            columns={assignmentColumns}
            data={assignments}
            rowKey={(assignment) => assignment.id}
            emptyMessage="No assignments yet"
            tableClassName="min-w-[760px]"
          />
        </div>
      </SectionCard>
    </div>
  )
}
