# Dashboard Data Layer - Quick Reference

## 📍 Find API Endpoints to Implement

Search for `TODO: Call API endpoint:` in `src/services/dashboardService.ts`

All 8 functions need API endpoint integration:
1. `fetchStatCardsData()` - GET `/api/admin/stats`
2. `fetchRevenueVsSpendingData()` - GET `/api/admin/finance/revenue-spending`
3. `fetchFeeData()` - GET `/api/admin/fees/summary`
4. `fetchTeachersData()` - GET `/api/admin/teachers`
5. `fetchLeaveRequestsData()` - GET `/api/admin/leave-requests?status=pending`
6. `fetchSubjectPerformanceData()` - GET `/api/admin/academics/subject-performance`
7. `fetchAttendanceHeatmapData()` - GET `/api/admin/attendance/heatmap`
8. `fetchActivityFeedData()` - GET `/api/admin/activities/feed`

## 🚀 Quick Start - Replace Dummy Data

1. Open `src/services/dashboardService.ts`
2. Find a function (e.g., `fetchStatCardsData`)
3. Replace the dummy data return with actual API call:

```tsx
// Before:
return new Promise((resolve) => {
  setTimeout(() => resolve(dummyData), 500);
});

// After:
const response = await fetch('/api/admin/stats');
if (!response.ok) throw new Error('Failed to fetch stats');
return response.json();
```

## 📦 Key Files

| File | Purpose |
|------|---------|
| `src/services/dashboardService.ts` | 🔌 API calls (8 functions with TODO) |
| `src/hooks/useDashboard.ts` | 🪝 React hooks (8 custom hooks) |
| `src/types/dashboard.ts` | 📝 TypeScript interfaces |
| `src/utils/dashboardHelpers.ts` | 🛠️ Helper functions |
| `src/components/dashboard/*.tsx` | 🎨 UI components (receive data via props) |

## 🔄 How Components Get Data

```
Dashboard.tsx uses hook
     ↓
useStatCardsData() hook
     ↓
fetchStatCardsData() service
     ↓
Returns StatCardData[]
     ↓
StatRow component displays it
```

## ✅ Current State

- ✅ Architecture setup complete
- ✅ All hooks created
- ✅ All types defined
- ✅ Dummy data in place
- ⏳ **Ready for API integration**

## 🎯 Next Steps

1. Get API endpoint specifications from backend team
2. Update each function in `dashboardService.ts` with actual API call
3. Test each endpoint
4. Handle error cases and loading states

## 💡 Tips

- Each hook automatically handles loading states (`loading`, `error`, `data`)
- Components can conditionally render based on `loading` prop
- All data flows through the hook → service pattern
- Easy to add caching or request debouncing later
