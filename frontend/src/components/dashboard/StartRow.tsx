import { StatCard } from '../charts/StatCard'
import type { StatRowProps } from '@/types/components'

export const StatRow: React.FC<StatRowProps> = ({ stats }) => (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {stats.map((stat) => (
      <StatCard key={stat.label} {...stat} />
    ))}
  </div>

)