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
    <section className={`theme-card ${className}`}>
      <div className={`flex items-center justify-between gap-4 theme-modal-header ${headerClassName}`}>
        <div>
          <h2 className="theme-h4">{title}</h2>
          {description && <p className="theme-text-sm">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          {action}
          {badge && (
            <span className="theme-badge theme-badge-info">
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
