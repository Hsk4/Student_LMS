import React from 'react'
import type { ButtonProps } from '@/types/components'

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-200',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-200',
  }

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