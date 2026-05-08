# Dashboard Data Layer Architecture

## Overview
This document describes the separation of data/fetching logic from UI components in the dashboard. The architecture follows best practices for maintainability and scalability.

## Architecture Structure

```
src/
├── services/
│   ├── dashboardService.ts          # API calls & data fetching logic
│   └── adminService.ts              # General admin service
├── hooks/
│   └── useDashboard.ts              # Custom React hooks for data fetching
├── types/
│   ├── dashboard.ts                 # TypeScript interfaces for dashboard data
│   └── nav.ts
├── utils/
│   ├── dashboardHelpers.ts          # Helper functions & icon mappings
│   └── helpers.ts
└── components/
    ├── dashboard/                   # Presentational components (UI only)
    │   ├── ActivityFeed.tsx
    │   ├── AttendanceHeatmap.tsx
    │   ├── FeeDonutChart.tsx
    │   ├── LeaveRequestsCard.tsx
    │   ├── RevenueVsSpending.tsx
    │   ├── StartRow.tsx
    │   ├── StatCard.tsx
    │   ├── SubjectPerformanceGauges.tsx
    │   └── TeachersTable.tsx
    └── pages/admin/
        └── Dashboard.tsx             # Main page component
```

## File Descriptions

### 1. **dashboardService.ts** - Data Fetching Layer
Location: `src/services/dashboardService.ts`

Contains all API calls and data fetching functions. Each function represents a separate data endpoint:

- `fetchStatCardsData()` - Stat cards (teachers, students, revenue, attendance)
- `fetchRevenueVsSpendingData()` - Financial data
- `fetchFeeData()` - Fee payment summary
- `fetchTeachersData()` - List of teachers
- `fetchLeaveRequestsData()` - Pending leave requests
- `fetchSubjectPerformanceData()` - Subject performance metrics
- `fetchAttendanceHeatmapData()` - Attendance data visualization
- `fetchActivityFeedData()` - Activity feed/logs

**TODO Comments**: Each function has a TODO comment indicating where to replace dummy data with actual API endpoints.

### 2. **useDashboard.ts** - Custom Hooks
Location: `src/hooks/useDashboard.ts`

Custom React hooks for managing data fetching, loading states, and error handling:

- `useStatCardsData()` - Returns { data, loading, error }
- `useRevenueVsSpendingData()` - Returns { data, loading, error }
- `useFeeData()` - Returns { data, loading, error }
- `useTeachersData()` - Returns { data, loading, error }
- `useLeaveRequestsData()` - Returns { data, loading, error }
- `useSubjectPerformanceData()` - Returns { data, loading, error }
- `useAttendanceHeatmapData()` - Returns { data, loading, error }
- `useActivityFeedData()` - Returns { data, loading, error }

**Usage Pattern**:
```tsx
const { data, loading, error } = useStatCardsData();
```

### 3. **dashboard.ts** - Type Definitions
Location: `src/types/dashboard.ts`

TypeScript interfaces defining all data structures:

- `StatCardData` - Individual stat card data
- `RevenueData` - Revenue vs spending comparison
- `FeeData` - Fee payment breakdown
- `TeacherData` - Teacher information
- `LeaveRequestData` - Leave request details
- `SubjectPerformanceData` - Subject performance metrics
- `AttendanceHeatmapData` - Attendance heatmap week data
- `ActivityFeedData` - Activity feed item
- `DashboardState` - Combined dashboard state

### 4. **dashboardHelpers.ts** - Utility Functions
Location: `src/utils/dashboardHelpers.ts`

Helper functions and mappings:

- Icon type mappings for stat cards and activities
- Background color mappings
- Formatting utilities (currency, percentage)
- `getStatBgColor()` - Get background color for stat
- `getActivityIconType()` - Get icon type for activity

### 5. **Dashboard.tsx** - Main Page Component
Location: `src/pages/admin/Dashboard.tsx`

Uses all custom hooks to fetch data and renders UI components:

```tsx
const { data: statsData, loading: statsLoading } = useStatCardsData();
const { data: revenueData, loading: revenueLoading } = useRevenueVsSpendingData();
// ... more hooks

// Render with null checks and loading states
```

## Data Flow

```
Dashboard.tsx (Page Component)
    ├── Calls Custom Hooks (useStatCardsData, useFeeData, etc.)
    │   ├── useStatCardsData()
    │   ├── useRevenueVsSpendingData()
    │   ├── useFeeData()
    │   └── ... (8 total hooks)
    │
    ├── Each Hook Calls Service Function
    │   ├── fetchStatCardsData()
    │   ├── fetchRevenueVsSpendingData()
    │   ├── fetchFeeData()
    │   └── ... (8 total service functions)
    │
    ├── Service Returns Data (Currently Dummy, TODO: Replace with API)
    │   └── Each service has TODO comments for API endpoints
    │
    └── Component Renders UI with Data
        ├── StatRow (with stats)
        ├── RevenueVsSpendingChart (with revenue data)
        ├── FeeDonutChart (with fee data)
        ├── TeachersTable (with teachers)
        ├── LeaveRequestsCard (with leave requests)
        ├── SubjectPerformanceGauges (with performance data)
        ├── AttendanceHeatmap (with attendance data)
        └── ActivityFeed (with activities)
```

## How to Add API Endpoints

Each data fetching function in `dashboardService.ts` has a TODO comment indicating where to add the API call:

### Example: Replacing dummy stats data with API

**Before (Current - Dummy Data)**:
```tsx
export const fetchStatCardsData = async (): Promise<StatCardData[]> => {
  const dummyData: StatCardData[] = [ /* ... */ ];
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyData), 500);
  });
};
```

**After (With API Call)**:
```tsx
export const fetchStatCardsData = async (): Promise<StatCardData[]> => {
  const response = await fetch('/api/admin/stats');
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
};
```

## Benefits of This Architecture

1. **Separation of Concerns**: UI components focus only on rendering
2. **Reusability**: Hooks can be used in multiple components
3. **Testability**: Service functions and hooks are easy to unit test
4. **Maintainability**: Changes to data structure only affect service layer
5. **Type Safety**: TypeScript ensures data consistency
6. **Error Handling**: Centralized loading and error states
7. **Easy API Integration**: Clear TODO comments show where to add endpoints
8. **Consistent Patterns**: All data fetching follows same pattern

## Current Status

✅ Data layer architecture implemented
✅ Custom hooks created for all dashboard data
✅ TypeScript types defined
✅ Helper functions and utilities setup
✅ Dashboard component refactored to use hooks
✅ ActivityFeed component updated for new data format

⏳ **TODO**: Replace dummy data with actual API calls (see TODO comments in `dashboardService.ts`)

## Example Implementation

To see all TODO locations, search for "TODO:" in:
- `src/services/dashboardService.ts` - 8 TODO comments for API endpoints
- Other files may have additional TODOs for integration points
