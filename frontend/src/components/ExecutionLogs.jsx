export default function ExecutionLogs({ executions }) {
  if (!executions || executions.length === 0) return null;

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="text-xl font-bold mb-2">Execution Logs</h3>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Execution ID</th>
            <th className="border px-2 py-1">Workflow ID</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Logs</th>
          </tr>
        </thead>
        <tbody>
          {executions.map(exec => (
            <tr key={exec.id} className="hover:bg-gray-100">
              <td className="border px-2 py-1">{exec.id}</td>
              <td className="border px-2 py-1">{exec.workflow_id}</td>
              <td className="border px-2 py-1">{exec.status}</td>
              <td className="border px-2 py-1 text-sm">
                {exec.logs.map((log, idx) => (
                  <div key={idx}>
                    {log.step_name || "Step"} - {log.rule ? `${log.rule}=${log.result}` : log.status}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}