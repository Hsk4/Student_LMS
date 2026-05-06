import React from 'react'

type ButtonProps = {
    children: React.ReactNode
    onClick: () => void
    type?: 'button' | 'submit' | 'reset'
    variant ? : 'primary' | 'secondary'
    className?: string
    disabled? : boolean
}

const Button : React.FC<ButtonProps> = ({

    children,
    onClick,
    type = 'button',
    variant = "primary",
    className = "",
    disabled = false
}) => {

 const base = "px-4 py-2 rounded-md font-medium text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"

 const variants :  Record <string, string> = {
     primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
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