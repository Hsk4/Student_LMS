import React from 'react'
import type { BadgeProps } from '@/types/components'

const Badge: React.FC<BadgeProps> = ({ label, type = 'default' }) => {
    

        const styles : Record<string, string> = {
            "default" : "theme-badge",
            "success" : "theme-badge theme-badge-success",
            "error" : "theme-badge theme-badge-danger",
            // keep alias for older usages
            "danger" : "theme-badge theme-badge-danger",
            "warning" : "theme-badge theme-badge-warning",
            "info" : "theme-badge theme-badge-info"
        };

        return (
            <span className={styles[type] || styles.default}>
                {label}
            </span>
        )
}

export default Badge
// export default React.memo(Badge;