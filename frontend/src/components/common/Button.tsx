import React from 'react'
import type { ButtonProps } from '@/types/components'
import { themeClasses } from '@/styles/theme'

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const base = `${themeClasses.button} ${themeClasses.buttonBase}`;

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'theme-btn theme-admin-btn',
    secondary: 'theme-btn theme-badge-info',
    danger: 'theme-btn theme-badge-danger',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;