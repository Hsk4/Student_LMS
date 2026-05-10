import type { GenericTableProps } from '@/types/components'
import { themeClasses } from '@/styles/theme'

function Table<T extends Record<string, any>>({
  columns,
  data,
}: GenericTableProps<T>) {
  return (
    <table className="theme-table">
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i} className="theme-table th">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="theme-table tbody tr">
            {columns.map((col, j) => (
              <td key={j} className="theme-table td">
                {String(row[col.accessor])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;