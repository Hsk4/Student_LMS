import React, { useMemo, useState } from 'react'
import Button from '@/components/common/Button'
import Badge from '@/components/common/Badge'
import SectionCard from '@/components/common/SectionCard'
import DataTable from '@/components/common/DataTable'
import type { DataTableColumn } from '@/types/components'
import {
  initialNotes,
  initialQuizzes,
  initialReminders,
  initialTeacherStudents,
  studyClasses,
  taughtClasses,
  type TeacherNote,
  type TeacherQuiz,
  type TeacherReminder,
  type TeacherStudent,
} from '@/data/teacherDashboard'
import { BookOpen, ClipboardList, Bell, StickyNote, Users, Plus, GraduationCap } from 'lucide-react'

const classLabel = (classId: string) => taughtClasses.find((item) => item.id === classId)?.code ?? classId

export default function TeacherDashboard() {
  const [selectedClassId, setSelectedClassId] = useState(taughtClasses[0]?.id ?? '')
  const [students, setStudents] = useState<TeacherStudent[]>(initialTeacherStudents)
  const [quizzes, setQuizzes] = useState<TeacherQuiz[]>(initialQuizzes)
  const [notes, setNotes] = useState<TeacherNote[]>(initialNotes)
  const [reminders, setReminders] = useState<TeacherReminder[]>(initialReminders)

  const [studentForm, setStudentForm] = useState({
    name: '',
    studentId: '',
    rollNumber: '',
    email: '',
    classId: selectedClassId,
  })
  const [quizForm, setQuizForm] = useState({
    title: '',
    classId: selectedClassId,
    dueDate: '',
    mode: 'MCQ' as TeacherQuiz['mode'],
    questions: 10,
  })
  const [noteForm, setNoteForm] = useState({
    title: '',
    audience: 'Class' as TeacherNote['audience'],
    content: '',
  })
  const [reminderForm, setReminderForm] = useState({
    title: '',
    detail: '',
    dueAt: '',
    priority: 'Normal' as TeacherReminder['priority'],
  })

  const selectedClass = useMemo(() => taughtClasses.find((item) => item.id === selectedClassId) ?? taughtClasses[0], [selectedClassId])
  const classStudents = useMemo(() => students.filter((student) => student.classId === selectedClassId), [students, selectedClassId])

  const teacherStudentColumns: DataTableColumn<TeacherStudent>[] = [
    {
      header: 'Student',
      className: 'min-w-[180px]',
      render: (student) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900">{student.name}</span>
          <span className="text-xs text-slate-500">{student.studentId}</span>
        </div>
      ),
    },
    {
      header: 'Roll No.',
      render: (student) => <span className="font-medium text-slate-700">{student.rollNumber}</span>,
    },
    {
      header: 'Class',
      render: (student) => <span className="text-slate-600">{classLabel(student.classId)}</span>,
    },
    {
      header: 'Performance',
      render: (student) => <span className="font-semibold text-slate-700">{student.performance}%</span>,
    },
    {
      header: 'Status',
      render: (student) => (
        <Badge
          label={student.status}
          type={student.status === 'Active' ? 'success' : student.status === 'Needs Help' ? 'warning' : 'error'}
        />
      ),
    },
  ]

  const quizColumns: DataTableColumn<TeacherQuiz>[] = [
    { header: 'Quiz', render: (quiz) => <span className="font-semibold text-slate-900">{quiz.title}</span> },
    { header: 'Class', render: (quiz) => <span className="text-slate-600">{classLabel(quiz.classId)}</span> },
    { header: 'Mode', render: (quiz) => <span className="text-slate-600">{quiz.mode}</span> },
    { header: 'Due Date', render: (quiz) => <span className="text-slate-600">{quiz.dueDate}</span> },
    { header: 'Questions', render: (quiz) => <span className="font-medium text-slate-700">{quiz.questions}</span> },
  ]

  const noteColumns: DataTableColumn<TeacherNote>[] = [
    { header: 'Title', render: (note) => <span className="font-semibold text-slate-900">{note.title}</span> },
    { header: 'Audience', render: (note) => <span className="text-slate-600">{note.audience}</span> },
    { header: 'Updated', render: (note) => <span className="text-slate-600">{new Date(note.updatedAt).toLocaleString()}</span> },
  ]

  const reminderColumns: DataTableColumn<TeacherReminder>[] = [
    { header: 'Reminder', render: (reminder) => <span className="font-semibold text-slate-900">{reminder.title}</span> },
    { header: 'Details', className: 'min-w-[240px]', render: (reminder) => <span className="text-slate-600">{reminder.detail}</span> },
    { header: 'Due', render: (reminder) => <span className="text-slate-600">{new Date(reminder.dueAt).toLocaleString()}</span> },
    {
      header: 'Priority',
      render: (reminder) => (
        <Badge
          label={reminder.priority}
          type={reminder.priority === 'High' ? 'error' : reminder.priority === 'Normal' ? 'warning' : 'success'}
        />
      ),
    },
  ]

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentForm.name.trim() || !studentForm.studentId.trim()) return

    setStudents((current) => [
      {
        id: `stu-${Date.now()}`,
        name: studentForm.name.trim(),
        studentId: studentForm.studentId.trim(),
        rollNumber: studentForm.rollNumber.trim(),
        email: studentForm.email.trim(),
        classId: studentForm.classId,
        performance: 0,
        status: 'Active',
      },
      ...current,
    ])
    setStudentForm({ name: '', studentId: '', rollNumber: '', email: '', classId: selectedClassId })
  }

  const handleAddQuiz = (e: React.FormEvent) => {
    e.preventDefault()
    if (!quizForm.title.trim()) return

    setQuizzes((current) => [
      {
        id: `quiz-${Date.now()}`,
        title: quizForm.title.trim(),
        classId: quizForm.classId,
        dueDate: quizForm.dueDate || new Date().toISOString().split('T')[0],
        mode: quizForm.mode,
        questions: quizForm.questions,
      },
      ...current,
    ])
    setQuizForm({ title: '', classId: selectedClassId, dueDate: '', mode: 'MCQ', questions: 10 })
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!noteForm.title.trim() || !noteForm.content.trim()) return

    setNotes((current) => [
      {
        id: `note-${Date.now()}`,
        title: noteForm.title.trim(),
        audience: noteForm.audience,
        content: noteForm.content.trim(),
        updatedAt: new Date().toISOString(),
      },
      ...current,
    ])
    setNoteForm({ title: '', audience: 'Class', content: '' })
  }

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reminderForm.title.trim()) return

    setReminders((current) => [
      {
        id: `rem-${Date.now()}`,
        title: reminderForm.title.trim(),
        detail: reminderForm.detail.trim(),
        dueAt: reminderForm.dueAt || new Date().toISOString(),
        priority: reminderForm.priority,
      },
      ...current,
    ])
    setReminderForm({ title: '', detail: '', dueAt: '', priority: 'Normal' })
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <section className="theme-card overflow-hidden rounded-[24px] border-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Teacher Workspace</p>
            <h1 className="text-3xl font-bold">Manage your classes, quizzes, notes, and reminders</h1>
            <p className="max-w-2xl text-sm leading-6 text-white/85">
              Track the classes you teach, review the classes you are studying, add students directly into a class, and keep teacher-specific notes and reminders in one place.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[420px]">
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Classes</p>
              <p className="mt-2 text-2xl font-bold">{taughtClasses.length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Students</p>
              <p className="mt-2 text-2xl font-bold">{students.length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Quizzes</p>
              <p className="mt-2 text-2xl font-bold">{quizzes.length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Reminders</p>
              <p className="mt-2 text-2xl font-bold">{reminders.length}</p>
            </div>
          </div>
        </div>
      </section>

      <SectionCard id="classes" title="My Classes" description="Classes you are actively teaching" badge={`${taughtClasses.length} teaching`}>
        <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
          {taughtClasses.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.code} · {item.section}</p>
                </div>
                <Badge label={item.status} type={item.status === 'Teaching' ? 'success' : item.status === 'Planning' ? 'warning' : 'default'} />
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>{item.schedule}</p>
                <p>Room: {item.room}</p>
                <p>Students: {item.students}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard id="study" title="Classes I’m Studying" description="Development and upskilling classes" badge={`${studyClasses.length} enrolled`}>
        <div className="grid gap-4 p-4 md:grid-cols-2">
          {studyClasses.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.code}</p>
                </div>
                <Badge label={item.status} type="default" />
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>{item.section}</p>
                <p>{item.schedule}</p>
                <p>{item.room}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <SectionCard
          id="students"
          title="Students by Class"
          description="Filter the students you teach and add new students to a class"
          badge={selectedClass?.code ?? 'Class'}
          action={
            <select
              value={selectedClassId}
              onChange={(e) => {
                const nextClassId = e.target.value
                setSelectedClassId(nextClassId)
                setStudentForm((current) => ({ ...current, classId: nextClassId }))
                setQuizForm((current) => ({ ...current, classId: nextClassId }))
              }}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              {taughtClasses.map((item) => (
                <option key={item.id} value={item.id}>{item.code}</option>
              ))}
            </select>
          }
        >
          <div className="space-y-4 p-4">
            <DataTable
              columns={teacherStudentColumns}
              data={classStudents}
              rowKey={(student) => student.id}
              emptyMessage="No students in this class yet"
            />

            <form onSubmit={handleAddStudent} className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-2">
              <div className="md:col-span-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Plus size={16} /> Add student to {selectedClass?.code}
              </div>
              <input
                value={studentForm.name}
                onChange={(e) => setStudentForm((current) => ({ ...current, name: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Student name"
              />
              <input
                value={studentForm.studentId}
                onChange={(e) => setStudentForm((current) => ({ ...current, studentId: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Student ID"
              />
              <input
                value={studentForm.rollNumber}
                onChange={(e) => setStudentForm((current) => ({ ...current, rollNumber: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Roll number"
              />
              <input
                type="email"
                value={studentForm.email}
                onChange={(e) => setStudentForm((current) => ({ ...current, email: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Email"
              />
              <select
                value={studentForm.classId}
                onChange={(e) => setStudentForm((current) => ({ ...current, classId: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
              >
                {taughtClasses.map((item) => (
                  <option key={item.id} value={item.id}>{item.code} · {item.title}</option>
                ))}
              </select>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit">Add Student</Button>
              </div>
            </form>
          </div>
        </SectionCard>

        <SectionCard
          id="quizzes"
          title="Create Quiz"
          description="Build quizzes for the class you are teaching"
          badge="Planner"
          action={<Badge label="Draft mode" type="warning" />}
        >
          <div className="space-y-4 p-4">
            <form onSubmit={handleAddQuiz} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><ClipboardList size={16} /> Quiz builder</div>
              <input
                value={quizForm.title}
                onChange={(e) => setQuizForm((current) => ({ ...current, title: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2 w-full"
                placeholder="Quiz title"
              />
              <div className="grid gap-3 md:grid-cols-2">
                <select
                  value={quizForm.classId}
                  onChange={(e) => setQuizForm((current) => ({ ...current, classId: e.target.value }))}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                >
                  {taughtClasses.map((item) => (
                    <option key={item.id} value={item.id}>{item.code}</option>
                  ))}
                </select>
                <select
                  value={quizForm.mode}
                  onChange={(e) => setQuizForm((current) => ({ ...current, mode: e.target.value as TeacherQuiz['mode'] }))}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option value="MCQ">MCQ</option>
                  <option value="Short Answer">Short Answer</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="date"
                  value={quizForm.dueDate}
                  onChange={(e) => setQuizForm((current) => ({ ...current, dueDate: e.target.value }))}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                <input
                  type="number"
                  min={1}
                  value={quizForm.questions}
                  onChange={(e) => setQuizForm((current) => ({ ...current, questions: Number(e.target.value || 0) }))}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="Questions"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save Quiz</Button>
              </div>
            </form>

            <DataTable
              columns={quizColumns}
              data={quizzes.filter((quiz) => quiz.classId === selectedClassId)}
              rowKey={(quiz) => quiz.id}
              emptyMessage="No quizzes for this class yet"
            />
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard id="notes" title="Teacher Notes" description="Class plans, parent follow-ups, and department notes" badge={`${notes.length} saved`}>
          <div className="space-y-4 p-4">
            <form onSubmit={handleAddNote} className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><StickyNote size={16} /> Notes for teaching needs</div>
              <input
                value={noteForm.title}
                onChange={(e) => setNoteForm((current) => ({ ...current, title: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2 w-full"
                placeholder="Note title"
              />
              <select
                value={noteForm.audience}
                onChange={(e) => setNoteForm((current) => ({ ...current, audience: e.target.value as TeacherNote['audience'] }))}
                className="rounded-lg border border-slate-300 px-3 py-2 w-full"
              >
                <option value="Class">Class</option>
                <option value="Parent">Parent</option>
                <option value="Department">Department</option>
              </select>
              <textarea
                value={noteForm.content}
                onChange={(e) => setNoteForm((current) => ({ ...current, content: e.target.value }))}
                className="min-h-[110px] rounded-lg border border-slate-300 px-3 py-2 w-full"
                placeholder="Write a note for your teaching workflow"
              />
              <div className="flex justify-end">
                <Button type="submit">Save Note</Button>
              </div>
            </form>
            <DataTable
              columns={noteColumns}
              data={notes}
              rowKey={(note) => note.id}
              emptyMessage="No teacher notes yet"
            />
          </div>
        </SectionCard>

        <SectionCard id="reminders" title="Reminders" description="Keep teacher-specific deadlines and follow-ups in view" badge={`${reminders.length} active`}>
          <div className="space-y-4 p-4">
            <form onSubmit={handleAddReminder} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Bell size={16} /> Reminder planner</div>
              <input
                value={reminderForm.title}
                onChange={(e) => setReminderForm((current) => ({ ...current, title: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2 w-full"
                placeholder="Reminder title"
              />
              <textarea
                value={reminderForm.detail}
                onChange={(e) => setReminderForm((current) => ({ ...current, detail: e.target.value }))}
                className="min-h-[90px] rounded-lg border border-slate-300 px-3 py-2 w-full"
                placeholder="Reminder details"
              />
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="datetime-local"
                  value={reminderForm.dueAt}
                  onChange={(e) => setReminderForm((current) => ({ ...current, dueAt: e.target.value }))}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                <select
                  value={reminderForm.priority}
                  onChange={(e) => setReminderForm((current) => ({ ...current, priority: e.target.value as TeacherReminder['priority'] }))}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option value="High">High</option>
                  <option value="Normal">Normal</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save Reminder</Button>
              </div>
            </form>
            <DataTable
              columns={reminderColumns}
              data={reminders}
              rowKey={(reminder) => reminder.id}
              emptyMessage="No reminders yet"
            />
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Quick Actions" description="Teacher productivity shortcuts" badge="Today">
        <div className="grid gap-4 p-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700"><GraduationCap size={18} /></div>
              <div>
                <p className="font-semibold text-slate-900">Class focus</p>
                <p className="text-sm text-slate-600">{selectedClass?.title}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-700"><Users size={18} /></div>
              <div>
                <p className="font-semibold text-slate-900">Students in view</p>
                <p className="text-sm text-slate-600">{classStudents.length} students after filter</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-3 text-amber-700"><BookOpen size={18} /></div>
              <div>
                <p className="font-semibold text-slate-900">Planning mode</p>
                <p className="text-sm text-slate-600">Quiz, notes, and reminders are teacher-specific.</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
