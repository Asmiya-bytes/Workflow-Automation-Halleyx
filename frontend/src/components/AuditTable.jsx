export default function AuditTable({ data }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Audit Logs</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Status</th>
            <th>Started</th>
            <th>Ended</th>
          </tr>
        </thead>

        <tbody>
          {data.map((e) => (
            <tr key={e.id} className="border-t">
              <td>{e.id}</td>
              <td>{e.status}</td>
              <td>{new Date(e.startedAt).toLocaleString()}</td>
              <td>{e.endedAt ? new Date(e.endedAt).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}