import EmptyState from './EmptyState'

export default function Table({ columns, data, keyField = 'id', onRowClick, emptyMessage }) {
  if (!data || data.length === 0) {
    return <EmptyState message={emptyMessage || 'No records found.'} />
  }

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-medium text-ink-muted text-xs uppercase tracking-wide whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row[keyField]}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`border-b border-border last:border-0 ${
                onRowClick ? 'cursor-pointer hover:bg-surface' : ''
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3.5 align-middle">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
