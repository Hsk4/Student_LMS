import React from 'react'
import type { SectionCardProps } from '@/types/components'

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  badge,
  children,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  action,
}) => {
  return (
    <section className={`rounded-lg border border-slate-200 bg-white ${className}`} style={{ borderWidth: '0.5px' }}>
      <div className={`flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4 ${headerClassName}`} style={{ borderBottomWidth: '0.5px' }}>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          {action}
          {badge && (
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              {badge}
            </span>
          )}
        </div>
      </div>
      <div className={bodyClassName}>{children}</div>
    </section>
  )
}

export default SectionCard
