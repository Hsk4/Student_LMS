import type { TeachersTableProps } from '@/types/components'

export const TeachersTable: React.FC<TeachersTableProps> = ({ teachers }) => (
  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden" style={{ borderWidth: '0.5px' }}>
    {/* Header */}
    <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between" style={{ borderBottomWidth: '0.5px' }}>
      <h3 className="text-base font-semibold text-slate-900">Teachers</h3>
      <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
        View all →
      </a>
    </div>
    
    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50" style={{ borderBottomWidth: '0.5px' }}>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Subject</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {teachers.map((t, i) => (
            <tr key={i} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">{t.name}</td>
              <td className="px-6 py-4 text-slate-600">{t.subject}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  t.status === "Active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-amber-100 text-amber-800"
                }`}>
                  {t.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);