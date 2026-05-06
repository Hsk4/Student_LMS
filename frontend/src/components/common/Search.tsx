type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void

  placeholder?: string
  disabled?: boolean
  className?: string
}

export const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  disabled = false,
  className = ""
}: SearchBarProps) => {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full p-2 border rounded-lg ${className}`}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onSubmit) {
          onSubmit(value)
        }
      }}
    />
  )
}