export default function WorkflowList({ workflows }) {
  return (
    <div className="p-4 grid gap-4">
      {workflows.map((wf) => (
        <div key={wf.id} className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg">{wf.name}</h2>
            <p>Steps: {wf.steps.length} | Version: {wf.version} | Status: {wf.is_active ? 'Active' : 'Inactive'}</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-700">Edit</button>
            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700">Execute</button>
          </div>
        </div>
      ))}
    </div>
  );
}