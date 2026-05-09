import type { DataTableProps } from '@/types/components'

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
      <div className={`flex h-32 items-center justify-center text-slate-500 ${className}`}>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className={`w-full text-sm ${tableClassName}`}>
        <thead>
          <tr className="border-b border-slate-200">
            {columns.map((column) => (
              <th
                key={column.header}
                className={`px-4 py-3 text-left font-semibold text-slate-700 ${column.headerClassName ?? ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={rowKey(row)} className="border-b border-slate-100 transition-colors hover:bg-slate-50">
              {columns.map((column) => (
                <td key={column.header} className={`px-4 py-3 ${column.className ?? ''}`}>
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
