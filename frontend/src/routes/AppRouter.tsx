import { Routes, Route, Navigate } from "react-router-dom"

// Layouts
import DashboardLayout from "@/components/layout/DashboardLayout"

// Unified auth pages
import Login from "@/pages/auth/Login"
import Signup from "@/pages/auth/Signup"
// import ForgotPassword from "@/pages/auth/ForgotPassword"

// Admin pages
import Dashboard from "@/pages/admin/Dashboard"
import AdminNotes from "@/pages/admin/Notes"
import Teachers from "@/pages/admin/Teachers"
import Students from "@/pages/admin/Students"
import Attendance from "@/pages/admin/Attendance"
// import Accounts from "@/pages/admin/Accounts"
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
// import StudentNotes from "@/pages/student/Notes"
// import StudentDashboard from "@/pages/student/Dashboard"
// import StudentLayout from "@/components/layout/StudentLayout"

// Route guard (boilerplate from your docs)
// import { ProtectedRoute } from "@/routes/AdminRoutes"

export default function AppRouter() {
  return (
    <Routes>
      {/* Root: redirect to student home for now */}
      <Route path="/" element={<Navigate to="/student/dashboard" replace />} />

      {/* Unified auth routes - role selected in form */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

      {/* Protected /admin routes */}
      <Route path="/admin/*" element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="students" element={<Students />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="notes" element={<AdminNotes />} />
        {/* <Route path="accounts" element={<Accounts />} /> */}
        {/* Add other admin child routes here */}
      </Route>

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
      {/* <Route path="/student/*" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="notes" element={<StudentNotes />} />
      </Route> */}

      {/* 404 Fallback */}
      <Route path="*" element={<div className="p-12 text-center">404 | Page Not Found</div>} />
    </Routes>
  )
}