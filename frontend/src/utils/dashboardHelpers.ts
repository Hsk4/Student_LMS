/**
 * Dashboard Utilities
 * Icon mappings and helper functions
 */

/**
 * Icon component mapping for stat cards
 */
export const STAT_ICON_TYPES: Record<string, string> = {
  'Total teachers': 'users',
  'Total students': 'graduationCap',
  'Monthly revenue': 'dollarSign',
  'Attendance rate today': 'calendar',
};

/**
 * Icon component mapping for activity feed types
 */
export const ACTIVITY_ICON_TYPES: Record<string, string> = {
  'student_enrolled': 'userPlus',
  'leave_approved': 'checkCircle',
  'fee_payment': 'creditCard',
  'exam_result': 'alertCircle',
  'message': 'messageSquare',
};

/**
 * Background color mapping for stat cards
 */
export const STAT_BG_COLORS: Record<string, string> = {
  'Total teachers': 'bg-purple-100',
  'Total students': 'bg-green-100',
  'Monthly revenue': 'bg-amber-100',
  'Attendance rate today': 'bg-red-100',
};

/**
 * Get background color by stat label
 */
export const getStatBgColor = (label: string): string => {
  return STAT_BG_COLORS[label] || 'bg-slate-100';
};

/**
 * Get icon type by stat label
 */
export const getStatIconType = (label: string): string => {
  return STAT_ICON_TYPES[label] || 'users';
};

/**
 * Get activity icon type by activity type
 */
export const getActivityIconType = (type: string): string => {
  return ACTIVITY_ICON_TYPES[type] || 'messageSquare';
};

/**
 * Format currency value
 */
export const formatCurrency = (value: number | string): string => {
  if (typeof value === 'string') return value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
  }).format(value);
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number): string => {
  return `${value}%`;
};
