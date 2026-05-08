/**
 * React Component Type Organization Refactoring Summary
 * ======================================================
 * 
 * OBJECTIVE:
 * - Centralize all component prop interfaces in a single file (src/types/components.ts)
 * - Use React.FC<Props> pattern consistently across all components
 * - Remove inline interface definitions from .tsx files
 * - Keep .tsx files clean and focused on rendering logic only
 * 
 * IMPLEMENTATION DETAILS:
 * =====================
 * 
 * 1. CENTRALIZED TYPES FILE
 *    Location: src/types/components.ts
 *    Purpose: Single source of truth for all component prop types
 *    
 *    Organized into sections:
 *    - Common Components (Button, Avatar, Badge, Modal, Pagination, Search, Table, Toast)
 *    - Dashboard Components (StatCard, ActivityFeed, TeachersTable, etc.)
 *    - Layout Components (DashboardLayout, Sidebar, Topbar)
 *    - Feature Components (Notes, etc.)
 * 
 * 2. COMPONENTS REFACTORED
 * 
 *    Common Components:
 *    ✓ Button.tsx         - Now imports ButtonProps from components.ts
 *    ✓ Avatar.tsx         - Now imports AvatarProps from components.ts
 *    ✓ Badge.tsx          - Now imports BadgeProps from components.ts
 *    ✓ Modal.tsx          - Now imports ModalProps from components.ts
 *    ✓ Pagination.tsx     - Now imports PaginationProps from components.ts
 * 
 *    Chart Components:
 *    ✓ StatCard.tsx       - Imports StatCardProps & MiniSparklineProps from components.ts
 *    ✓ Sparkline.tsx      - Imports MiniSparklineProps from components.ts
 * 
 *    Dashboard Components:
 *    ✓ ActivityFeed.tsx              - Imports ActivityFeedProps from components.ts
 *    ✓ TeachersTable.tsx             - Imports TeachersTableProps from components.ts
 *    ✓ SubjectPerformanceGauges.tsx  - Imports SubjectPerformanceGaugesProps from components.ts
 *    ✓ StartRow.tsx                  - Imports StatRowProps from components.ts
 *    ✓ RevenueVsSpending.tsx          - Imports RevenueVsSpendingChartProps from components.ts
 *    ✓ LeaveRequestsCard.tsx          - Imports LeaveRequestsCardProps from components.ts
 *    ✓ FeeDonutChart.tsx              - Imports FeeDonutChartProps from components.ts
 *    ✓ AttendanceHeatmap.tsx          - Imports AttendanceHeatmapProps from components.ts
 * 
 *    Feature Components:
 *    ✓ Notes.tsx          - Imports NotesProps from components.ts
 * 
 * 3. REACT.FC PATTERN STANDARDIZATION
 * 
 *    BEFORE:
 *    - Mixed patterns: type ButtonProps = {...}, interface BadgeProps {...}
 *    - Inconsistent spacing: React.FC<Props>, React.FC <Props>
 *    - Inline definitions scattered across files
 * 
 *    AFTER:
 *    - Consistent: const Component: React.FC<Props> = ({ ...props }) => { ... }
 *    - Single import: import type { Props } from '@/types/components'
 *    - Type-only imports: import type { ... } (prevents circular dependencies)
 * 
 * 4. TYPE IMPORT STRATEGY
 * 
 *    All component prop types use type-only imports to:
 *    - Avoid circular dependency issues
 *    - Enable better TypeScript tree-shaking
 *    - Improve build performance
 * 
 *    Pattern: import type { ComponentProps } from '@/types/components'
 * 
 * 5. BACKWARD COMPATIBILITY
 * 
 *    Flexible interface definitions allow for optional properties:
 *    - Primary properties match actual component implementations
 *    - Optional properties (?) allow for various usage patterns
 *    - Union types support multiple input formats where needed
 * 
 *    Example: LeaveRequestsCardProps
 *    pending?: number | Array<{...}>  // Supports both count and list formats
 * 
 * 6. BENEFITS ACHIEVED
 * 
 *    ✓ Reduced code duplication (removed ~100+ lines of type definitions)
 *    ✓ Improved maintainability (single location for component contracts)
 *    ✓ Better developer experience (centralized prop documentation)
 *    ✓ Consistent React.FC usage across codebase
 *    ✓ No inline types cluttering .tsx files
 *    ✓ Easier refactoring (change types once, affects all usages)
 * 
 * 7. USAGE EXAMPLE
 * 
 *    OLD (Before):
 *    ──────────────
 *    interface ButtonProps {
 *      children: React.ReactNode
 *      onClick: () => void
 *    }
 *    const Button : React.FC<ButtonProps> = ({ children, onClick }) => (...)
 * 
 *    NEW (After):
 *    ───────────
 *    import type { ButtonProps } from '@/types/components'
 *    const Button: React.FC<ButtonProps> = ({ children, onClick }) => (...)
 * 
 * 8. NESTED COMPONENT EXCEPTION
 * 
 *    Small inline components (like MarkdownPreview in Notes.tsx) may keep
 *    inline types if they're:
 *    - Only used in one parent component
 *    - Simple and unlikely to change
 *    - Not exported or reused
 * 
 *    This keeps centralized types file focused on exported components.
 * 
 * MAINTENANCE GUIDELINES:
 * ======================
 * 
 * When adding new components:
 * 1. Define props interface in src/types/components.ts
 * 2. Use: const Component: React.FC<ComponentProps> = ({ ...props }) => ...
 * 3. Import types with: import type { ComponentProps } from '@/types/components'
 * 4. Keep .tsx files focused on rendering logic only
 * 
 * When modifying existing props:
 * 1. Update the interface in src/types/components.ts
 * 2. All components using that type automatically get the changes
 * 3. TypeScript will flag any incompatibilities immediately
 */

export {}
