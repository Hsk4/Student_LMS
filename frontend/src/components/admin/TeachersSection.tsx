import React from 'react'
import type { AdminTeachersSectionProps } from '@/types/components'

export const TeachersSection: React.FC<AdminTeachersSectionProps> = ({ teachers }) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6" style={{ borderWidth: '0.5px' }}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Teachers</h2>
          <p className="text-sm text-slate-500">Admin teacher directory</p>
        </div>
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
          {teachers.length} Total
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {teachers.map((teacher) => (
          <article
            key={teacher.id}
            className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
            style={{ borderWidth: '0.5px' }}
          >
            <div className="flex items-center gap-4">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-white"
              />
              <div>
                <h3 className="text-base font-semibold text-slate-900">{teacher.name}</h3>
                <p className="text-sm text-slate-600">{teacher.degree}</p>
                <p className="text-xs text-slate-500">{teacher.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-700 md:grid-cols-4">
              <div>
                <p className="text-xs text-slate-500">Subject</p>
                <p className="font-medium">{teacher.subject}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Experience</p>
                <p className="font-medium">{teacher.experienceYears} yrs</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="font-medium">{teacher.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Phone</p>
                <p className="font-medium">{teacher.phone}</p>
              </div>
            </div>

            <span
              className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${
                teacher.status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : teacher.status === 'On Leave'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-200 text-slate-700'
              }`}
            >
              {teacher.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TeachersSection
