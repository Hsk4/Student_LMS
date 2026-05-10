import { StatCard } from '../charts/StatCard'
import type { StatRowProps } from '@/types/components'
import { themeClasses } from '@/styles/theme'

export const StatRow: React.FC<StatRowProps> = ({ stats }) => (
 <div className={themeClasses.gridCols4}>
    {stats.map((stat) => (
      <StatCard key={stat.label} {...stat} />
    ))}
  </div>

)