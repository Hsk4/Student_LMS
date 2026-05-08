import { Routes, Route, Navigate } from "react-router-dom"

// Layouts
import DashboardLayout from "@/components/layout/DashboardLayout"

// Auth pages
// import Login from "@/pages/auth/Login"
// import ForgotPassword from "@/pages/auth/ForgotPassword"

// Admin pages
import Dashboard from "@/pages/admin/Dashboard"
// import Teachers from "@/pages/admin/Teachers"
// import Students from "@/pages/admin/Students"
// import Attendance from "@/pages/admin/Attendance"
// import Notes from "@/pages/admin/Notes"
// import Accounts from "@/pages/admin/Accounts"
// ...import other admin pages as needed

// Route guard (boilerplate from your docs)
// import { ProtectedRoute } from "@/routes/AdminRoutes"

export default function AppRouter() {
  return (
    <Routes>
      {/* Root: redirect to admin dashboard */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Public auth routes */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

      {/* Protected /admin routes */}
      <Route
        path="/admin/*"
        element={
       
        <DashboardLayout />
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        {/* <Route path="teachers" element={<Teachers />} />
        <Route path="students" element={<Students />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="notes" element={<Notes />} />
        <Route path="accounts" element={<Accounts />} /> */}
        {/* Add other admin child routes here */}
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<div className="p-12 text-center">404 | Page Not Found</div>} />
    </Routes>
  )
}