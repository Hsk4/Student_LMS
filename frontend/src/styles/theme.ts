// Tailwind theme utilities and constants
export const themeClasses = {
  // Card styles (universal across all dashboards)
  card: 'bg-white border border-slate-200 rounded-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.08)] transition-shadow duration-300',
  cardPadding: 'p-6',
  cardSmallPadding: 'p-4',

  // Button styles (universal)
  button: 'px-[18px] py-3 rounded-[14px] font-semibold transition-all duration-300 hover:-translate-y-px',
  buttonBase: 'inline-flex items-center gap-2',
  buttonSm: 'px-3 py-2 rounded-lg text-sm',
  buttonLg: 'px-6 py-4 text-lg',

  // Layout
  section: 'space-y-4',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Sidebar
  sidebarBase: 'w-64 fixed left-0 top-0 h-screen transition-colors duration-200',
  sidebarLink: 'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
  sidebarTitle: 'px-3 mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-slate-100/90',
  sidebarFooter: 'px-4 py-4 border-t bg-black/10',
  sidebarFooterName: 'text-sm font-semibold text-white truncate',
  sidebarFooterRole: 'text-xs text-slate-200 truncate',
  sidebarLinkActive: 'font-semibold',

  // Typography
  heading1: 'text-4xl font-bold text-slate-900',
  heading2: 'text-3xl font-bold text-slate-900',
  heading3: 'text-2xl font-bold text-slate-900',
  heading4: 'text-lg font-semibold text-slate-900',
  heading5: 'text-base font-semibold text-slate-700',
  
  textBase: 'text-base text-slate-700',
  textSm: 'text-sm text-slate-600',
  textXs: 'text-xs text-slate-500',

  // Grid
  gridCols2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  gridCols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  gridCols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',

  // Dashboard chrome
  dashboardHeading: 'text-3xl font-bold text-slate-900',
  dashboardSubheading: 'text-slate-500',
  dashboardMainButton: 'px-[18px] py-3 rounded-[14px] font-semibold transition-all duration-300 hover:-translate-y-px shadow-sm',
  dashboardCardShell: 'bg-white border border-slate-200 rounded-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]',
  dashboardCardShadowHover: 'hover:shadow-[0_4px_6px_rgba(0,0,0,0.08)]',

  // Status badges
  badgeSuccess: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800',
  badgeWarning: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800',
  badgeDanger: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800',
  badgeInfo: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800',

  // Role palettes for direct class composition
  admin: {
    sidebar: 'bg-admin-sidebar',
    sidebarHover: 'hover:bg-admin-sidebar-hover',
    sidebarActive: 'bg-admin-active text-white',
    button: 'bg-admin-button text-white hover:bg-admin-button-hover',
    accent: 'text-admin-active',
  },
  teacher: {
    sidebar: 'bg-teacher-sidebar',
    sidebarHover: 'hover:bg-teacher-sidebar-hover',
    sidebarActive: 'bg-teacher-active text-white',
    button: 'bg-teacher-button text-white hover:bg-teacher-button-hover',
    accent: 'text-teacher-active',
  },
  student: {
    sidebar: 'bg-student-sidebar',
    sidebarHover: 'hover:bg-student-sidebar-hover',
    sidebarActive: 'bg-student-active text-white',
    button: 'bg-student-button text-white hover:bg-student-button-hover',
    accent: 'text-student-active',
  },

  // Table
  tableContainer: 'overflow-x-auto rounded-xl border border-slate-200',
  tableHeader: 'bg-slate-50 border-b border-slate-200',
  tableRow: 'border-b border-slate-200 hover:bg-slate-50 transition-colors',
  tableCell: 'px-6 py-4 text-sm',
  tableCellHeader: 'px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider',

  // Modal
  modalOverlay: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
  modalContent: 'bg-white rounded-2xl shadow-xl max-w-md w-full mx-4',
  modalHeader: 'border-b border-slate-200 px-6 py-4',
  modalBody: 'px-6 py-4',
  modalFooter: 'border-t border-slate-200 px-6 py-4 flex gap-3 justify-end',

  // Form
  formGroup: 'space-y-2',
  label: 'block text-sm font-semibold text-slate-700',
  input: 'w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',
  textarea: 'w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none',
  select: 'w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',

  // Loader/Spinner
  spinner: 'inline-block animate-spin',
  
  // Alert/Toast
  alertContainer: 'fixed bottom-4 right-4 z-50',
  alertBase: 'rounded-lg px-4 py-3 shadow-lg',
  alertSuccess: 'bg-green-100 text-green-800 border border-green-300',
  alertError: 'bg-red-100 text-red-800 border border-red-300',
  alertWarning: 'bg-amber-100 text-amber-800 border border-amber-300',
  alertInfo: 'bg-blue-100 text-blue-800 border border-blue-300',
}

// Helper to build dynamic class strings
export const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}
