/**
 * Custom Hooks for Dashboard Data Fetching
 * Handles data loading and caching logic
 */

import { useState, useEffect } from 'react';
import {
  fetchStatCardsData,
  fetchRevenueVsSpendingData,
  fetchFeeData,
  fetchTeachersData,
  fetchLeaveRequestsData,
  fetchSubjectPerformanceData,
  fetchAttendanceHeatmapData,
  fetchActivityFeedData,
} from '@/services/dashboardService';
import type {
  StatCardData,
  RevenueData,
  FeeData,
  TeacherData,
  LeaveRequestData,
  SubjectPerformanceData,
  AttendanceHeatmapData,
  ActivityFeedData,
} from '@/types/dashboard';

/**
 * Hook for fetching stat cards data
 */
export const useStatCardsData = () => {
  const [data, setData] = useState<StatCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchStatCardsData();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stat cards');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

/**
 * Hook for fetching revenue vs spending data
 */
export const useRevenueVsSpendingData = () => {
  const [data, setData] = useState<RevenueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchRevenueVsSpendingData();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load revenue data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

/**
 * Hook for fetching fee data
 */
export const useFeeData = () => {
  const [data, setData] = useState<FeeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchFeeData();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load fee data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

/**
 * Hook for fetching teachers data
 */
export const useTeachersData = () => {
  const [data, setData] = useState<TeacherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchTeachersData();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teachers data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

/**
 * Hook for fetching leave requests data
 */
export const useLeaveRequestsData = () => {
  const [data, setData] = useState<LeaveRequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchLeaveRequestsData();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leave requests');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

/**
 * Hook for fetching subject performance data
 */
export const useSubjectPerformanceData = () => {
  const [data, setData] = useState<SubjectPerformanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchSubjectPerformanceData();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load subject performance');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

/**
 * Hook for fetching attendance heatmap data
 */
export const useAttendanceHeatmapData = () => {
  const [data, setData] = useState<AttendanceHeatmapData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchAttendanceHeatmapData();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load attendance data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

/**
 * Hook for fetching activity feed data
 */
export const useActivityFeedData = () => {
  const [data, setData] = useState<ActivityFeedData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchActivityFeedData();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activity feed');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};
