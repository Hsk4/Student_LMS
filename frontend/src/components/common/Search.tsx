import type { SearchProps } from '@/types/components'

export const SearchBar = ({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Search...',
  disabled = false,
  className = ''
}: SearchProps) => {
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