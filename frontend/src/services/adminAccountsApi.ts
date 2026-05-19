const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

export interface CreateStudentPayload {
  FullName: string
  StudentID: string
  RollNumber: string
  Email: string
  Phone: string
  Password: string
  HomeroomTeacher: string
  SemesterFees: number
  PreviousSchool: string
}

export interface CreatedStudentResponse {
  _id?: string
  FullName: string
  StudentID: string
  RollNumber: string
  Email: string
  Phone: string
  Password?: string
  HomeroomTeacher: string
  SemesterFees: number
  PreviousSchool: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateTeacherPayload {
  FullName: string
  TeacherID: string
  Degree: string
  Subject: string
  Batch: string
  Semester: string
  JoinedDate: string
  Salary: number
  TotalStudents: number
  Email: string
  Phone: string
  Password: string
  Department: string
  PreviousSchool: string
}

export interface CreatedTeacherResponse {
  _id?: string
  FullName: string
  TeacherID: string
  Degree: string
  Subject: string
  Batch: string
  Semester: string
  JoinedDate: string
  Salary: number
  TotalStudents: number
  Email: string
  Phone: string
  Password?: string
  Department: string
  PreviousSchool: string
  createdAt?: string
  updatedAt?: string
}

async function parseError(response: Response) {
  const payload = await response.json().catch(() => null)
  return payload?.message || `Request failed with status ${response.status}`
}

async function postJson<T>(endpoint: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(await parseError(response))
  }

  const payload = await response.json()
  return (payload?.data ?? payload) as T
}

export function createStudent(payload: CreateStudentPayload) {
  return postJson<CreatedStudentResponse>('/admin/add-student', payload)
}

export function createTeacher(payload: CreateTeacherPayload) {
  return postJson<CreatedTeacherResponse>('/admin/add-teacher', payload)
}