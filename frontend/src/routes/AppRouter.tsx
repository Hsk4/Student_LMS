import { Routes, Route, Navigate } from "react-router-dom"

// Layouts
import DashboardLayout from "@/components/layout/DashboardLayout"
import ProtectedRoute from "@/components/common/ProtectedRoute"

// Unified auth pages
import Login from "@/pages/auth/Login"
// import ForgotPassword from "@/pages/auth/ForgotPassword"

// Admin pages
import Dashboard from "@/pages/admin/Dashboard"
import AdminNotes from "@/pages/admin/Notes"
import Teachers from "@/pages/admin/Teachers"
import Students from "@/pages/admin/Students"
import Attendance from "@/pages/admin/Attendance"
import Accounts from "@/pages/admin/Accounts"
// ...import other admin pages as needed

// Student pages
import StudentDashboard from "@/pages/student/Dashboard"
import StudentLayout from "@/components/layout/StudentLayout"
import StudentAssignments from "@/pages/student/Assignments"
import StudentHelp from "@/pages/student/Help"
import StudentContact from "@/pages/student/Contact"
import StudentProgress from "@/pages/student/Progress"
import StudentExams from "@/pages/student/Exams"
import StudentNotes from "@/pages/student/Notes"
import TeacherLayout from "@/components/layout/TeacherLayout"
import TeacherDashboard from "@/pages/teacher/Dashboard"
// import StudentNotes from "@/pages/student/Notes"
// import StudentDashboard from "@/pages/student/Dashboard"
// import StudentLayout from "@/components/layout/StudentLayout"

// Route guard (boilerplate from your docs)
// import { ProtectedRoute } from "@/routes/AdminRoutes"

export default function AppRouter() {
  const storedRole = localStorage.getItem('userRole')
  const storedToken = localStorage.getItem('authToken')

  const rootRedirect = (() => {
    if (!storedToken || !storedRole) return '/login'
    if (storedRole === 'teacher') return '/teacher/dashboard'
    if (storedRole === 'student') return '/student/dashboard'
    return '/admin/dashboard'
  })()

  return (
    <Routes>
      {/* Root: redirect based on auth state */}
      <Route path="/" element={<Navigate to={rootRedirect} replace />} />

      {/* Unified auth routes */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        {/* Protected /admin routes */}
        <Route path="/admin/*" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="students" element={<Students />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="notes" element={<AdminNotes />} />
          <Route path="accounts" element={<Accounts />} />
          {/* Add other admin child routes here */}
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        {/* Protected /student routes */}
        <Route path="/student/*" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="notes" element={<StudentNotes />} />
          <Route path="help" element={<StudentHelp />} />
          <Route path="contact" element={<StudentContact />} />
          <Route path="progress" element={<StudentProgress />} />
          <Route path="exams" element={<StudentExams />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
        {/* Protected /teacher routes */}
        <Route path="/teacher/*" element={<TeacherLayout />}>
          <Route path="dashboard" element={<TeacherDashboard />} />
        </Route>
      </Route>
      {/* <Route path="/student/*" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="notes" element={<StudentNotes />} />
      </Route> */}

      {/* 404 Fallback */}
      <Route path="*" element={<div style={{ padding: 48, textAlign: 'center' }}>404 | Page Not Found</div>} />
    </Routes>
  )
}