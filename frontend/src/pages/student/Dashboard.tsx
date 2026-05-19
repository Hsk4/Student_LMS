import { CalendarDays, GraduationCap, ClipboardList, BookOpen } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'
import Badge from '@/components/common/Badge'
import DataTable from '@/components/common/DataTable'
import type { DataTableColumn, StudentAssignment } from '@/types/components'
import { courses, assignments } from '@/data/studentDashboard'
import { Link } from 'react-router-dom'

// course and assignment data moved to `src/data/studentDashboard.ts`

export default function StudentDashboard() {
  const studentName = localStorage.getItem('studentName') || 'John Doe'

  const assignmentColumns: DataTableColumn<StudentAssignment>[] = [
    {
      header: 'Course',
      render: (assignment) => <span style={{ fontFamily: 'monospace', color: '#334155' }}>{assignment.course}</span>,
    },
    {
      header: 'Assignment',
      className: '',
      render: (assignment) => <span style={{ fontWeight: 600, color: '#0f172a' }}>{assignment.title}</span>,
    },
    {
      header: 'Due Date',
      render: (assignment) => <span style={{ color: '#64748b' }}>{assignment.dueDate}</span>,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 16 }}>
      <section className="theme-card" style={{ borderRadius: 24, background: 'linear-gradient(135deg,#6366f1,#7c3aed)', color: 'white', padding: 24, boxShadow: '0 18px 40px rgba(79,70,229,0.2)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'stretch', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.7)' }}>Welcome</p>
            <h1 style={{ marginTop: 8, fontSize: 28, fontWeight: 700 }}>Welcome, {studentName}!</h1>
            <p style={{ marginTop: 12, maxWidth: 800, fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)'}}>
              See what you're studying now, who is teaching it, and the assignments waiting for you.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 10 }}>
            <div style={{ borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', padding: 10, backdropFilter: 'blur(6px)' }}>
              <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)' }}>Courses</p>
              <p style={{ marginTop: 6, fontSize: 22, fontWeight: 700 }}>{courses.length}</p>
            </div>
            <div style={{ borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', padding: 10, backdropFilter: 'blur(6px)' }}>
              <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)' }}>Assignments</p>
              <p style={{ marginTop: 6, fontSize: 22, fontWeight: 700 }}>{assignments.length}</p>
            </div>
            <div style={{ borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', padding: 10, backdropFilter: 'blur(6px)' }}>
              <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)' }}>Progress</p>
              <p style={{ marginTop: 6, fontSize: 22, fontWeight: 700 }}>64%</p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18 }}>
        <SectionCard
          title="My Courses"
          description="Courses currently assigned to you"
          badge={`${courses.length} Active`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 12 }}>
            {courses.map((course) => (
              <article key={course.id} className="theme-card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                      <BookOpen size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a' }}>{course.title}</h3>
                        <span style={{ borderRadius: 9999, background: 'white', padding: '6px 12px', fontSize: 12, fontWeight: 600, color: '#334155', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                          {course.code}
                        </span>
                      </div>
                      <p style={{ marginTop: 6, fontSize: 14, color: '#475569' }}>Teacher: {course.teacher}</p>
                      <p style={{ marginTop: 6, fontSize: 14, color: '#64748b' }}>{course.schedule}</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 10 }}>
                    <div style={{ borderRadius: 12, background: 'white', padding: 10 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#64748b' }}>Progress</p>
                      <p style={{ marginTop: 6, fontSize: 22, fontWeight: 700, color: '#0f172a' }}>{course.progress}%</p>
                    </div>
                    <div style={{ borderRadius: 12, background: 'white', padding: 10 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#64748b' }}>Assignments</p>
                      <p style={{ marginTop: 6, fontSize: 22, fontWeight: 700, color: '#0f172a' }}>{course.assignmentCount}</p>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <Link to={`/student/assignments?course=${course.code}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 14, color: '#475569', textDecoration: 'none' }}>
                        <div style={{ borderRadius: '50%', background: 'white', padding: 12, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                          <BookOpen size={20} />
                        </div>
                        <span style={{ marginTop: 8, fontSize: 12 }}>Assignments</span>
                      </Link>
                    </div>
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
          >
            <div style={{ padding: 12, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
              <div className="theme-card" style={{ padding: 16, borderRadius: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ borderRadius: 12, backgroundColor: '#eef2ff', padding: 12, color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CalendarDays size={18} />
                  </div>
                  <div>
                    <p className="theme-h5">Next class</p>
                    <p className="theme-text-sm">Algorithms · 10:30 AM</p>
                  </div>
                </div>
              </div>
              <div className="theme-card" style={{ padding: 16, borderRadius: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ borderRadius: 12, backgroundColor: '#ecfdf5', padding: 12, color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <p className="theme-h5">Attendance</p>
                    <p className="theme-text-sm">92% this semester</p>
                  </div>
                </div>
              </div>
              <div className="theme-card" style={{ padding: 16, borderRadius: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ borderRadius: 12, backgroundColor: '#fffbeb', padding: 12, color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ClipboardList size={18} />
                  </div>
                  <div>
                    <p className="theme-h5">Pending work</p>
                    <p className="theme-text-sm">2 assignments need attention before the weekend.</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
      </div>

      <SectionCard title="Assignments for You" description="Tasks linked to your enrolled courses" badge={`${assignments.length} total`}>
        <div style={{ padding: 16 }}>
          <DataTable
            columns={assignmentColumns}
            data={assignments}
            rowKey={(assignment) => assignment.id}
            emptyMessage="No assignments yet"
            tableClassName={''}
          />
        </div>
      </SectionCard>
    </div>
  )
}
