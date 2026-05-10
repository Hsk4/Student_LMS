import type { DataTableProps } from '@/types/components'
import { themeClasses } from '@/styles/theme'

function DataTable<T extends Record<string, any>>({
  columns,
  data,
  rowKey,
  emptyMessage = 'No records found',
  className = '',
  tableClassName = '',
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={`theme-card theme-text-base flex h-32 items-center justify-center ${className}`}>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={`theme-table-container ${className}`}>
      <table className={`theme-table ${tableClassName}`}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className={`theme-table th ${column.headerClassName ?? ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={rowKey(row)} className="theme-table tbody tr">
              {columns.map((column) => (
                <td key={column.header} className={`theme-table td ${column.className ?? ''}`}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
