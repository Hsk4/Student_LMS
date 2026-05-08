/**
 * Dashboard Data Types
 * Defines all data structures used in dashboard components
 */

export interface Trend {
  type: 'up' | 'down';
  value: string;
}

export interface StatCardData {
  value: string | number;
  label: string;
  trend: Trend;
  sparkData: number[];
}

export interface RevenueData {
  revenue: number[];
  spending: number[];
  months: string[];
}

export interface FeeData {
  total: number;
  paid: number;
  pending: number;
  overdue: number;
}

export interface TeacherData {
  id: number;
  name: string;
  subject: string;
  status: 'Active' | 'On Leave';
}

export interface LeaveRequestData {
  id: number;
  name: string;
  type: string;
  duration: string;
  date: string;
}

export interface SubjectPerformanceData {
  id: number;
  name: string;
  percent: number;
  color: string;
}

export interface AttendanceHeatmapData {
  id: number;
  label: string;
  days: string[];
  values: string[];
}

export interface ActivityFeedData {
  id: number;
  type: string;
  message: string;
  time: string;
  color: string;
  bg: string;
}

/**
 * Dashboard State combining all data
 */
export interface DashboardState {
  stats: StatCardData[];
  revenueData: RevenueData;
  feeData: FeeData;
  teachers: TeacherData[];
  leaveRequests: LeaveRequestData[];
  subjectPerformance: SubjectPerformanceData[];
  attendance: AttendanceHeatmapData[];
  activities: ActivityFeedData[];
  loading: boolean;
  error: string | null;
}
