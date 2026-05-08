# Dashboard Data Layer - Visual Guide

## 🏗️ System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION LAYER                             │
│                                                                          │
│  Dashboard.tsx                                                          │
│  ├─ StatRow.tsx          (displays stats)                              │
│  ├─ RevenueVsSpendingChart.tsx                                         │
│  ├─ FeeDonutChart.tsx                                                  │
│  ├─ TeachersTable.tsx                                                  │
│  ├─ LeaveRequestsCard.tsx                                              │
│  ├─ SubjectPerformanceGauges.tsx                                       │
│  ├─ AttendanceHeatmap.tsx                                              │
│  └─ ActivityFeed.tsx      (displays activities)                        │
│                                                                          │
│  ❌ NO DATA LOGIC - ONLY UI RENDERING ❌                               │
└───────────────────────────┬───────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                        STATE MANAGEMENT LAYER                           │
│                                                                          │
│  useDashboard.ts (8 Custom Hooks)                                      │
│                                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐      │
│  │useStatCardsData()│  │useTeachersData() │  │useFeeData()      │      │
│  │  Returns:        │  │  Returns:        │  │  Returns:        │      │
│  │  {data, loading, │  │  {data, loading, │  │  {data, loading, │      │
│  │   error}         │  │   error}         │  │   error}         │      │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘      │
│                                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐      │
│  │useLeaveRequestsD│  │useSubjectPerf... │  │useAttendanceH... │      │
│  │useRevenueVsSpen │  │useActivityFeedD()│  │  (5 more hooks)  │      │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘      │
│                                                                          │
│  ✅ EACH HOOK: useEffect() + State Management + Error Handling ✅       │
└───────────────────────────┬───────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                          SERVICE LAYER                                   │
│                    (dashboardService.ts)                                │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ 8 Async Functions - Each with TODO comment for API endpoint    │    │
│  │                                                                 │    │
│  │ fetchStatCardsData()              → GET /api/admin/stats       │    │
│  │ fetchRevenueVsSpendingData()      → GET /api/admin/finance... │    │
│  │ fetchFeeData()                    → GET /api/admin/fees/...   │    │
│  │ fetchTeachersData()               → GET /api/admin/teachers    │    │
│  │ fetchLeaveRequestsData()          → GET /api/admin/leave...   │    │
│  │ fetchSubjectPerformanceData()     → GET /api/admin/academics..│    │
│  │ fetchAttendanceHeatmapData()      → GET /api/admin/attendance │    │
│  │ fetchActivityFeedData()           → GET /api/admin/activities │    │
│  │                                                                 │    │
│  │ 🔧 Currently: Dummy Data (Timers)                              │    │
│  │ 🎯 TODO: Replace with fetch() calls to backend API            │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ✅ EACH FUNCTION: Takes no params, Returns typed Promise ✅            │
└───────────────────────────┬───────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                           TYPE LAYER                                     │
│                      (src/types/dashboard.ts)                           │
│                                                                          │
│  StatCardData    RevenueData    FeeData      TeacherData               │
│  LeaveRequestD   SubjectPerf    AttendanceH  ActivityFeedData          │
│  DashboardState (Combined)                                             │
│                                                                          │
│  ✅ All TypeScript interfaces - Type safety guaranteed ✅               │
└───────────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagram

```
User Opens Dashboard
        │
        ↓
Dashboard.tsx Mounts
        │
        ├─→ useStatCardsData() Hook Called
        │        │
        │        ↓ useEffect triggers
        │        ↓
        │   fetchStatCardsData() Called
        │        │
        │        ↓ (Currently: setTimeout returns dummy data)
        │        ↓ (TODO: Replace with fetch('/api/admin/stats'))
        │        │
        │        ↓ Service returns StatCardData[]
        │        │
        │        ↓ Hook sets: data, loading=false, error=null
        │        │
        │        ↓ Component re-renders with new data
        │
        ├─→ useTeachersData() Hook Called (similar flow)
        │
        ├─→ useFeeData() Hook Called (similar flow)
        │
        └─→ ... (6 more hooks called in parallel)
                │
                ↓ All data fetched
                │
                ↓ All components updated
                │
                ↓ Dashboard Rendered with Data
```

## 📊 Hook Usage Pattern

```
┌──────────────────────────────────────────────────────────┐
│  Inside Component (Dashboard.tsx)                        │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  const { data, loading, error } = useStatCardsData();   │
│                                                           │
│  if (loading) return <LoadingSpinner />;                │
│  if (error) return <ErrorMessage error={error} />;      │
│                                                           │
│  return <StatRow stats={data} />;                       │
│                                                           │
└──────────────────────────────────────────────────────────┘

Hook State Over Time:
├─ Initial: { data: [], loading: true, error: null }
├─ Fetching: { data: [], loading: true, error: null }
├─ Success: { data: [Array], loading: false, error: null }
└─ Error: { data: [], loading: false, error: "Message" }
```

## 🎯 File Dependencies Map

```
Components/Pages
├── Dashboard.tsx
│   ├── Imports: 8 hooks from src/hooks/useDashboard.ts
│   └── Uses icon imports from lucide-react
│
├── ActivityFeed.tsx
│   ├── Imports: type ActivityFeedData from src/types/dashboard.ts
│   ├── Imports: icons from lucide-react
│   └── Uses: getActivityIcon() helper
│
└── StatRow.tsx & others (unchanged)


Hooks Layer
└── src/hooks/useDashboard.ts
    ├── Imports: Service functions from src/services/dashboardService.ts
    ├── Imports: Types from src/types/dashboard.ts
    └── Exports: 8 custom hooks


Service Layer
└── src/services/dashboardService.ts
    ├── Imports: Types from src/types/dashboard.ts
    └── Exports: 8 async functions


Types Layer
└── src/types/dashboard.ts
    └── Exports: 9 TypeScript interfaces


Utils Layer
└── src/utils/dashboardHelpers.ts
    └── Exports: Mappings and helper functions
```

## 🚀 API Integration Steps (When Ready)

```
Step 1: Get API Spec
├─ Get endpoint URLs from backend team
├─ Get request/response formats
└─ Get authentication requirements

Step 2: Update Service Functions
├─ Open src/services/dashboardService.ts
├─ Find function (e.g., fetchStatCardsData)
├─ Replace dummy data with fetch()
│   OLD: return new Promise(resolve => { setTimeout(...) })
│   NEW: const response = await fetch('/api/admin/stats')
│         return response.json()
└─ Repeat for all 8 functions

Step 3: Test Each Endpoint
├─ Run app locally
├─ Check Network tab
├─ Verify response data
└─ Check for loading/error states

Step 4: Deploy
└─ Commit & push changes
```

## 🔍 Quick Navigation Guide

```
"I need to..."

📝 Add API call
  → Open: src/services/dashboardService.ts
  → Look for: TODO comment
  → Replace: Dummy data return

🪝 Use data in component
  → Import: import { useTeachersData } from '@/hooks/useDashboard'
  → Use: const { data, loading } = useTeachersData()
  → Display: {loading ? <Spinner /> : <Component data={data} />}

📚 Understand architecture
  → Read: DASHBOARD_ARCHITECTURE.md
  → Time: ~15 minutes

💡 See implementation examples
  → Read: DASHBOARD_API_EXAMPLES.md
  → Time: ~10 minutes

🎯 Find specific endpoint
  → Read: DASHBOARD_API_TODOS.md
  → Time: ~5 minutes

❓ What was changed
  → Read: DASHBOARD_REFACTORING_SUMMARY.md
  → Time: ~5 minutes

📂 Where is file XYZ
  → Read: DASHBOARD_MANIFEST.md
  → Time: ~3 minutes
```

## 🧪 Testing Strategy

```
Unit Testing
├─ Mock dashboardService.ts functions
├─ Test each hook with mocked data
└─ Verify loading/error states

Integration Testing
├─ Test Dashboard component with mocked hooks
├─ Test child components receive correct props
└─ Verify all pieces work together

E2E Testing
├─ Test with real API endpoints
├─ Verify data flows end-to-end
└─ Test error scenarios
```

## 📈 Benefits Comparison

```
BEFORE (Hardcoded Data)          AFTER (Data Layer)
├─ Dashboard component: 196 lines ├─ Dashboard: 124 lines
├─ Data mixed with UI             ├─ Separated concerns
├─ Hard to reuse data             ├─ Easy hook reuse
├─ Hard to test                   ├─ Easy to mock
├─ Hard to add API                ├─ Simple API swap
└─ No loading states              └─ Automatic states
```

---

**Visual Guide Created**: 2026-05-08
**Purpose**: Quick reference for system architecture
**Updated**: As needed
