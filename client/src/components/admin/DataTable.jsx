function DataTable({ columns, rows, keyField = 'id', emptyMessage = 'Không tìm thấy dữ liệu.' }) {
  return (
    <div className="admin-card overflow-hidden">
      <div className="admin-scrollbar overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={column.headClassName}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row[keyField]} className="hover:bg-slate-50/80">
                  {columns.map((column) => (
                    <td key={column.key} className={column.cellClassName}>
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-slate-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
