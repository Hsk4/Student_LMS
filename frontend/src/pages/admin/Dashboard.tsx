import React from "react";
import { FeeDonutChart } from "@/components/dashboard/FeeDonutChart";
import { TeachersTable } from "@/components/dashboard/TeachersTable";
import { LeaveRequestsCard } from "@/components/dashboard/LeaveRequestsCard";
import { SubjectPerformanceGauges } from "@/components/dashboard/SubjectPerformanceGauges";
import { AttendanceHeatmap } from "@/components/dashboard/AttendanceHeatmap";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { RevenueVsSpendingChart } from "@/components/dashboard/RevenueVsSpending";
import { StatRow } from "@/components/dashboard/StartRow";
import { 
  useStatCardsData, 
  useRevenueVsSpendingData, 
  useFeeData,
  useTeachersData,
  useLeaveRequestsData,
  useSubjectPerformanceData,
  useAttendanceHeatmapData,
  useActivityFeedData
} from "@/hooks/useDashboard";
import { Users, GraduationCap, DollarSign, Calendar } from 'lucide-react';

export const Dashboard: React.FC = () => {
  // Fetch all data using custom hooks
  const { data: statsData, loading: statsLoading } = useStatCardsData();
  const { data: revenueData, loading: revenueLoading } = useRevenueVsSpendingData();
  const { data: feeData, loading: feeLoading } = useFeeData();
  const { data: teachersData, loading: teachersLoading } = useTeachersData();
  const { data: leaveRequestsData, loading: leaveLoading } = useLeaveRequestsData();
  const { data: subjectPerfData, loading: subjectPerfLoading } = useSubjectPerformanceData();
  const { data: attendanceData, loading: attendanceLoading } = useAttendanceHeatmapData();
  const { data: activityData, loading: activityLoading } = useActivityFeedData();

  // Map data to component props with icons
  const statCardsWithIcons = statsData.map((stat, idx) => {
    const icons = [
      <Users size={20} key="users" />,
      <GraduationCap size={20} key="graduation" />,
      <DollarSign size={20} key="dollar" />,
      <Calendar size={20} key="calendar" />,
    ];
    const bgColors = ["bg-purple-100", "bg-green-100", "bg-amber-100", "bg-red-100"];
    
    return {
      ...stat,
      icon: icons[idx],
      iconBgColor: bgColors[idx],
    };
  });

  // Check if all data is loading
  const isLoading = statsLoading || revenueLoading || feeLoading || teachersLoading || 
                    leaveLoading || subjectPerfLoading || attendanceLoading || activityLoading;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here's your academic portal overview.</p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-slate-500">Loading dashboard data...</div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Stats Row */}
            <div className="mb-8">
              <StatRow stats={statCardsWithIcons} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                {revenueData && (
                  <RevenueVsSpendingChart 
                    revenue={revenueData.revenue} 
                    spending={revenueData.spending} 
                    months={revenueData.months} 
                  />
                )}
              </div>
              <div>
                {feeData && (
                  <FeeDonutChart 
                    total={feeData.total} 
                    paid={feeData.paid} 
                    pending={feeData.pending} 
                    overdue={feeData.overdue} 
                  />
                )}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <TeachersTable teachers={teachersData} />
              </div>
              <div>
                <LeaveRequestsCard pending={leaveRequestsData} />
              </div>
            </div>

            {/* Performance and Attendance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <SubjectPerformanceGauges subjects={subjectPerfData} />
              <AttendanceHeatmap weeks={attendanceData} />
            </div>

            {/* Activity Feed */}
            <div>
              <ActivityFeed feed={activityData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;