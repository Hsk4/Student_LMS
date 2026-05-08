import React from "react";
import { FeeDonutChart } from "@/components/dashboard/FeeDonutChart";
import { TeachersTable } from "@/components/dashboard/TeachersTable";
import { LeaveRequestsCard } from "@/components/dashboard/LeaveRequestsCard";
import { SubjectPerformanceGauges } from "@/components/dashboard/SubjectPerformanceGauges";
import { AttendanceHeatmap } from "@/components/dashboard/AttendanceHeatmap";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { RevenueVsSpendingChart } from "@/components/dashboard/RevenueVsSpending";
import { StatRow } from "@/components/dashboard/StartRow";
import { Users, GraduationCap, DollarSign, Calendar, UserPlus, CheckCircle, CreditCard, AlertCircle, MessageSquare } from 'lucide-react';

export const Dashboard: React.FC = () => {
  // 1. Stat Row Data
  const statCardsData: any[] = [
    {
      icon: <Users size={20} />,
      value: 48,
      label: "Total teachers",
      trend: { type: "up", value: "3" },
      sparkData: [8, 12, 10, 14, 18],
      iconBgColor: "bg-purple-100",
    },
    {
      icon: <GraduationCap size={20} />,
      value: 1240,
      label: "Total students",
      trend: { type: "up", value: "2.4%" },
      sparkData: [9, 13, 11, 16, 20],
      iconBgColor: "bg-green-100",
    },
    {
      icon: <DollarSign size={20} />,
      value: "PKR 184k",
      label: "Monthly revenue",
      trend: { type: "up", value: "8.1%" },
      sparkData: [10, 14, 12, 17, 20],
      iconBgColor: "bg-amber-100",
    },
    {
      icon: <Calendar size={20} />,
      value: "94.2%",
      label: "Attendance rate today",
      trend: { type: "down", value: "12 pending" },
      sparkData: [16, 20, 18, 19, 17],
      iconBgColor: "bg-red-100",
    },
  ];

  // 2. Revenue vs Spending Data
  const revenue = [52, 60, 56, 65, 62, 70, 76, 80];
  const spending = [38, 44, 36, 46, 40, 48, 50, 44];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  // 3. FeeDonut Data
  const total = 1240;
  const paid = 634;
  const pending = 372;
  const overdue = 234;

  // 4. Teachers Table Data
  const teachers: Array<{name: string; subject: string; status: "Active" | "On Leave"}> = [
    { name: "Dr. Ayesha M.", subject: "Mathematics", status: "Active" },
    { name: "Mr. Omar F.", subject: "Physics", status: "Active" },
    { name: "Ms. Sana R.", subject: "English", status: "On Leave" },
    { name: "Dr. Fatima N.", subject: "Biology", status: "Active" },
    { name: "Ms. Hina B.", subject: "CS", status: "Active" },
  ];

  // 5. Leave Requests
  const leaveRequests = [
    { name: "Mr. Bilal C.", type: "Medical", duration: "5 days", date: "Aug 20" },
    { name: "Ms. Sana R.", type: "Personal", duration: "2 days", date: "Aug 22" },
    { name: "Dr. Ayesha M.", type: "Casual", duration: "1 day", date: "Aug 25" },
  ];

  // 7. Subject Performance
  const subjectPerf = [
    { name: "Mathematics", percent: 82, color: "#7F77DD" },
    { name: "Physics", percent: 74, color: "#1D9E75" },
    { name: "Biology", percent: 88, color: "#639922" },
    { name: "English", percent: 66, color: "#EF9F27" },
  ];

  // 8. Attendance Heatmap
  const heatmapWeeks = [
    {
      label: "Wk1",
      days: ["M", "T", "W", "T", "F", "S", "S"],
      values: ["#97C459", "#639922", "#97C459", "#C0DD97", "#F09595", "#E8E8EE", "#E8E8EE"]
    },
    {
      label: "Wk2",
      days: ["M", "T", "W", "T", "F", "S", "S"],
      values: ["#639922", "#639922", "#639922", "#97C459", "#EF9F27", "#E8E8EE", "#E8E8EE"]
    },
    {
      label: "Wk3",
      days: ["M", "T", "W", "T", "F", "S", "S"],
      values: ["#97C459", "#C0DD97", "#639922", "#639922", "#F09595", "#E8E8EE", "#E8E8EE"]
    },
    {
      label: "Wk4",
      days: ["M", "T", "W", "T", "F", "S", "S"],
      values: ["#639922", "#97C459", "#97C459", "#C0DD97", "#E24B4A", "#E8E8EE", "#E8E8EE"]
    },
  ];

  // 9. Activity Feed
  const activityFeed: any[] = [
    {
      icon: <UserPlus size={16} />,
      action: <>New student <strong>Ali Raza</strong> enrolled in XI-A</>,
      time: "2 min ago",
      color: "#534AB7",
      bg: "#EEEDFE",
    },
    {
      icon: <CheckCircle size={16} />,
      action: <>Leave approved for <strong>Ms. Hina B.</strong></>,
      time: "11 min ago",
      color: "#3B6D11",
      bg: "#EAF3DE",
    },
    {
      icon: <CreditCard size={16} />,
      action: <>Fee payment received — Hamza Tariq · PKR 12,500</>,
      time: "34 min ago",
      color: "#854F0B",
      bg: "#FAEEDA",
    },
    {
      icon: <AlertCircle size={16} />,
      action: <>Exam result uploaded — Mid-term Biology Class XI</>,
      time: "1 hr ago",
      color: "#A32D2D",
      bg: "#FCEBEB",
    },
    {
      icon: <MessageSquare size={16} />,
      action: <>New message from <strong>Dr. Ayesha Malik</strong></>,
      time: "2 hr ago",
      color: "#185FA5",
      bg: "#E6F1FB",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here's your academic portal overview.</p>
        </div>

        {/* Stats Row */}
        <div className="mb-8">
          <StatRow stats={statCardsData} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RevenueVsSpendingChart revenue={revenue} spending={spending} months={months} />
          </div>
          <div>
            <FeeDonutChart total={total} paid={paid} pending={pending} overdue={overdue} />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TeachersTable teachers={teachers} />
          </div>
          <div>
            <LeaveRequestsCard pending={leaveRequests} />
          </div>
        </div>

        {/* Performance and Attendance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SubjectPerformanceGauges subjects={subjectPerf} />
          <AttendanceHeatmap weeks={heatmapWeeks} />
        </div>

        {/* Activity Feed */}
        <div>
          <ActivityFeed feed={activityFeed} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;