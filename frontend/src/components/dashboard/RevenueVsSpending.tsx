import type { RevenueVsSpendingChartProps } from '@/types/components'
import { themeClasses } from '@/styles/theme'

export const RevenueVsSpendingChart: React.FC<RevenueVsSpendingChartProps> = ({

    revenue,
    spending,
    months
}) => (

    <div className={`${themeClasses.dashboardCardShell} p-6`}>
    <div className="flex items-center justify-between mb-6">
      <h3 className={themeClasses.heading5}>Revenue vs Spending</h3>
      <span className={themeClasses.badgeInfo}>Monthly</span>
    </div>
    
    <div className="flex items-end justify-between gap-2 h-40">
      {months.map((month, idx) => (
        <div key={month} className="flex flex-col items-center flex-1 group">
          <div className="flex gap-1 items-end h-full w-full justify-center">
            <div
              className="flex-1 max-w-2 bg-indigo-500 rounded-t transition-all group-hover:bg-indigo-600"
              style={{
                height: `${revenue[idx]}%`,
              }}
              title={`Revenue: ${revenue[idx]}`}
            />
            <div
              className="flex-1 max-w-2 bg-slate-300 rounded-t transition-all group-hover:bg-slate-400"
              style={{
                height: `${spending[idx]}%`,
              }}
              title={`Spending: ${spending[idx]}`}
            />
          </div>
          <div className="text-xs font-medium text-slate-600 mt-2">{month}</div>
        </div>
      ))}
    </div>
    
    <div className="flex gap-6 mt-6">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full" style={{background:"#6366f1"}}/>
        <span className="text-sm text-slate-600">Revenue</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full" style={{background:"#cbd5e1"}}/>
        <span className="text-sm text-slate-600">Spending</span>
      </div>
    </div>
  </div>
)