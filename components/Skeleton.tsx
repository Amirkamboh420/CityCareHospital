export function SkeletonCard({ rows = 4 }: { rows?: number }) {
  return (
    <div className="panel">
      <div className="panel-body">
        <div className="sk sk-title" />
        {Array.from({ length: rows }).map((_, i) => (
          <div className="sk sk-line" key={i} style={{ width: `${92 - i * 7}%` }} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonTable({ cols = 5, rows = 6 }: { cols?: number; rows?: number }) {
  return (
    <div className="panel">
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i}><div className="sk sk-th" /></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>
                {Array.from({ length: cols }).map((_, c) => (
                  <td key={c}><div className="sk sk-line" style={{ width: `${70 + ((r + c) % 3) * 10}%` }} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
