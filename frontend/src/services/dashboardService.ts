/**
 * Dashboard Service
 * Handles all data fetching for dashboard components
 * TODO: Replace dummy data with actual API calls
 */

import type { 
  StatCardData, 
  RevenueData, 
  FeeData, 
  TeacherData, 
  LeaveRequestData, 
  SubjectPerformanceData, 
  AttendanceHeatmapData, 
  ActivityFeedData 
} from '@/types/dashboard';

/**
 * Fetch stat cards data (Total teachers, students, revenue, attendance)
 * TODO: Call API endpoint: GET /api/admin/stats
 */
export const fetchStatCardsData = async (): Promise<StatCardData[]> => {
  // Dummy data - replace with actual API call
  const dummyData: StatCardData[] = [
    {
      value: 48,
      label: "Total teachers",
      trend: { type: "up", value: "3" },
      sparkData: [8, 12, 10, 14, 18],
    },
    {
      value: 1240,
      label: "Total students",
      trend: { type: "up", value: "2.4%" },
      sparkData: [9, 13, 11, 16, 20],
    },
    {
      value: "PKR 184k",
      label: "Monthly revenue",
      trend: { type: "up", value: "8.1%" },
      sparkData: [10, 14, 12, 17, 20],
    },
    {
      value: "94.2%",
      label: "Attendance rate today",
      trend: { type: "down", value: "12 pending" },
      sparkData: [16, 20, 18, 19, 17],
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyData), 500);
  });
};

/**
 * Fetch revenue vs spending data
 * TODO: Call API endpoint: GET /api/admin/finance/revenue-spending
 */
export const fetchRevenueVsSpendingData = async (): Promise<RevenueData> => {
  // Dummy data - replace with actual API call
  const dummyData: RevenueData = {
    revenue: [52, 60, 56, 65, 62, 70, 76, 80],
    spending: [38, 44, 36, 46, 40, 48, 50, 44],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyData), 500);
  });
};

/**
 * Fetch fee payment data
 * TODO: Call API endpoint: GET /api/admin/fees/summary
 */
export const fetchFeeData = async (): Promise<FeeData> => {
  // Dummy data - replace with actual API call
  const dummyData: FeeData = {
    total: 1240,
    paid: 634,
    pending: 372,
    overdue: 234,
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyData), 500);
  });
};

/**
 * Fetch teachers list
 * TODO: Call API endpoint: GET /api/admin/teachers
 */
export const fetchTeachersData = async (): Promise<TeacherData[]> => {
  // Dummy data - replace with actual API call
  const dummyData: TeacherData[] = [
    { id: 1, name: "Dr. Ayesha M.", subject: "Mathematics", status: "Active" },
    { id: 2, name: "Mr. Omar F.", subject: "Physics", status: "Active" },
    { id: 3, name: "Ms. Sana R.", subject: "English", status: "On Leave" },
    { id: 4, name: "Dr. Fatima N.", subject: "Biology", status: "Active" },
    { id: 5, name: "Ms. Hina B.", subject: "CS", status: "Active" },
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyData), 500);
  });
};

/**
 * Fetch pending leave requests
 * TODO: Call API endpoint: GET /api/admin/leave-requests?status=pending
 */
export const fetchLeaveRequestsData = async (): Promise<LeaveRequestData[]> => {
  // Dummy data - replace with actual API call
  const dummyData: LeaveRequestData[] = [
    { id: 1, name: "Mr. Bilal C.", type: "Medical", duration: "5 days", date: "Aug 20" },
    { id: 2, name: "Ms. Sana R.", type: "Personal", duration: "2 days", date: "Aug 22" },
    { id: 3, name: "Dr. Ayesha M.", type: "Casual", duration: "1 day", date: "Aug 25" },
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyData), 500);
  });
};

/**
 * Fetch subject performance data
 * TODO: Call API endpoint: GET /api/admin/academics/subject-performance
 */
export const fetchSubjectPerformanceData = async (): Promise<SubjectPerformanceData[]> => {
  // Dummy data - replace with actual API call
  const dummyData: SubjectPerformanceData[] = [
    { id: 1, name: "Mathematics", percent: 82, color: "#7F77DD" },
    { id: 2, name: "Physics", percent: 74, color: "#1D9E75" },
    { id: 3, name: "Biology", percent: 88, color: "#639922" },
    { id: 4, name: "English", percent: 66, color: "#EF9F27" },
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyData), 500);
  });
};

/**
 * Fetch attendance heatmap data
 * TODO: Call API endpoint: GET /api/admin/attendance/heatmap
 */
export const fetchAttendanceHeatmapData = async (): Promise<AttendanceHeatmapData[]> => {
  // Dummy data - replace with actual API call
  const dummyData: AttendanceHeatmapData[] = [
    {
      id: 1,
      label: "Wk1",
      days: ["M", "T", "W", "T", "F", "S", "S"],
      values: ["#97C459", "#639922", "#97C459", "#C0DD97", "#F09595", "#E8E8EE", "#E8E8EE"],
    },
    {
      id: 2,
      label: "Wk2",
      days: ["M", "T", "W", "T", "F", "S", "S"],
      values: ["#639922", "#639922", "#639922", "#97C459", "#EF9F27", "#E8E8EE", "#E8E8EE"],
    },
    {
      id: 3,
      label: "Wk3",
      days: ["M", "T", "W", "T", "F", "S", "S"],
      values: ["#97C459", "#C0DD97", "#639922", "#639922", "#F09595", "#E8E8EE", "#E8E8EE"],
    },
    {
      id: 4,
      label: "Wk4",
      days: ["M", "T", "W", "T", "F", "S", "S"],
      values: ["#639922", "#97C459", "#97C459", "#C0DD97", "#E24B4A", "#E8E8EE", "#E8E8EE"],
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyData), 500);
  });
};

/**
 * Fetch activity feed data
 * TODO: Call API endpoint: GET /api/admin/activities/feed
 */
export const fetchActivityFeedData = async (): Promise<ActivityFeedData[]> => {
  // Dummy data - replace with actual API call
  const dummyData: ActivityFeedData[] = [
    {
      id: 1,
      type: "student_enrolled",
      message: "New student Ali Raza enrolled in XI-A",
      time: "2 min ago",
      color: "#534AB7",
      bg: "#EEEDFE",
    },
    {
      id: 2,
      type: "leave_approved",
      message: "Leave approved for Ms. Hina B.",
      time: "11 min ago",
      color: "#3B6D11",
      bg: "#EAF3DE",
    },
    {
      id: 3,
      type: "fee_payment",
      message: "Fee payment received — Hamza Tariq · PKR 12,500",
      time: "34 min ago",
      color: "#854F0B",
      bg: "#FAEEDA",
    },
    {
      id: 4,
      type: "exam_result",
      message: "Exam result uploaded — Mid-term Biology Class XI",
      time: "1 hr ago",
      color: "#A32D2D",
      bg: "#FCEBEB",
    },
    {
      id: 5,
      type: "message",
      message: "New message from Dr. Ayesha Malik",
      time: "2 hr ago",
      color: "#185FA5",
      bg: "#E6F1FB",
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyData), 500);
  });
};
