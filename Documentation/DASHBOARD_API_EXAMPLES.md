/**
 * EXAMPLE: How to implement API integration in dashboardService.ts
 * 
 * This file shows before/after examples for converting dummy data to real API calls
 */

// ====================================================================
// EXAMPLE 1: Simple API Call (Recommended)
// ====================================================================

// BEFORE (Current - Dummy Data):
/*
export const fetchStatCardsData = async (): Promise<StatCardData[]> => {
  // Dummy data - replace with actual API call
  const dummyData: StatCardData[] = [
    { value: 48, label: "Total teachers", ... },
    // ...
  ];
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyData), 500);
  });
};
*/

// AFTER (With API Call):
/*
export const fetchStatCardsData = async (): Promise<StatCardData[]> => {
  try {
    const response = await fetch('/api/admin/stats');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stat cards:', error);
    throw error;
  }
};
*/

// ====================================================================
// EXAMPLE 2: API Call with Error Handling
// ====================================================================

/*
export const fetchTeachersData = async (): Promise<TeacherData[]> => {
  try {
    const response = await fetch('/api/admin/teachers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add auth token if needed
        // 'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch teachers: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Validate response structure if needed
    if (!Array.isArray(data)) {
      throw new Error('Expected array of teachers');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching teachers data:', error);
    throw error;
  }
};
*/

// ====================================================================
// EXAMPLE 3: API Call with Query Parameters
// ====================================================================

/*
export const fetchLeaveRequestsData = async (): Promise<LeaveRequestData[]> => {
  try {
    const params = new URLSearchParams({
      status: 'pending',
      limit: '10',
    });
    
    const response = await fetch(`/api/admin/leave-requests?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch leave requests: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    throw error;
  }
};
*/

// ====================================================================
// EXAMPLE 4: Using Axios (if you prefer)
// ====================================================================

/*
import axios from 'axios';

export const fetchStatCardsData = async (): Promise<StatCardData[]> => {
  try {
    const response = await axios.get('/api/admin/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching stat cards:', error);
    throw error;
  }
};

export const fetchTeachersData = async (): Promise<TeacherData[]> => {
  try {
    const response = await axios.get('/api/admin/teachers', {
      params: {
        page: 1,
        limit: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
};
*/

// ====================================================================
// EXAMPLE 5: Using Environment Variables for API Base URL
// ====================================================================

/*
// Create a constants file: src/constants/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const ENDPOINTS = {
  STATS: '/api/admin/stats',
  TEACHERS: '/api/admin/teachers',
  LEAVE_REQUESTS: '/api/admin/leave-requests',
  // ... etc
};

// Then in dashboardService.ts:
import { API_BASE_URL, ENDPOINTS } from '@/constants/api';

export const fetchStatCardsData = async (): Promise<StatCardData[]> => {
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STATS}`);
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
};
*/

// ====================================================================
// EXAMPLE 6: Data Transformation (if API response differs from types)
// ====================================================================

/*
export const fetchTeachersData = async (): Promise<TeacherData[]> => {
  try {
    const response = await fetch('/api/admin/teachers');
    if (!response.ok) throw new Error('Failed to fetch teachers');
    
    const rawData = await response.json();
    
    // Transform API response to match TeacherData type
    const transformedData: TeacherData[] = rawData.map((teacher: any) => ({
      id: teacher.teacher_id,
      name: teacher.full_name,
      subject: teacher.subject_taught,
      status: teacher.is_active ? 'Active' : 'On Leave',
    }));
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
};
*/

// ====================================================================
// TIPS FOR IMPLEMENTATION
// ====================================================================

/*
1. ✅ Error Handling:
   - Use try-catch blocks
   - Log errors for debugging
   - Re-throw errors so hooks can handle them

2. ✅ Type Safety:
   - Always return the correct type as per interface
   - Transform API response if needed
   - Use TypeScript for compile-time safety

3. ✅ Loading States:
   - Hooks automatically handle loading, error, data
   - Components check these states for UI feedback
   - No need to manually manage state in hooks

4. ✅ Performance:
   - Consider caching responses
   - Implement request debouncing if needed
   - Use React Query or SWR for advanced caching

5. ✅ Environment Setup:
   - Create .env file: VITE_API_URL=http://localhost:3000
   - Access in code: import.meta.env.VITE_API_URL
   - Never commit .env to git (already in .gitignore)

6. ✅ Testing:
   - Mock service functions in tests
   - Test with dummy data like current implementation
   - Easy to switch between mock and real API

7. ✅ Security:
   - Always use HTTPS in production
   - Include auth tokens in headers if needed
   - Validate API responses
   - Handle unauthorized (401) responses
*/

// ====================================================================
// IMPLEMENTATION CHECKLIST
// ====================================================================

/*
For each function in dashboardService.ts:

☐ Replace dummy data return with API call
☐ Add error handling (try-catch)
☐ Add request headers if needed
☐ Transform response data if needed
☐ Match TypeScript interface exactly
☐ Test with actual backend
☐ Add loading indicator in component
☐ Handle error cases gracefully

Current functions to update:
☐ fetchStatCardsData()
☐ fetchRevenueVsSpendingData()
☐ fetchFeeData()
☐ fetchTeachersData()
☐ fetchLeaveRequestsData()
☐ fetchSubjectPerformanceData()
☐ fetchAttendanceHeatmapData()
☐ fetchActivityFeedData()
*/
