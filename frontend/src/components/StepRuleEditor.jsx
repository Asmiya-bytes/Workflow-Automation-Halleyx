export default function StepRuleEditor({ step }) {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-2">Step: {step.name}</h2>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Priority</th>
            <th className="border px-2 py-1">Condition</th>
            <th className="border px-2 py-1">Next Step</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {step.rules.map((rule) => (
            <tr key={rule.id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{rule.priority}</td>
              <td className="border px-2 py-1">{rule.condition}</td>
              <td className="border px-2 py-1">{rule.next_step_name}</td>
              <td className="border px-2 py-1 flex gap-2">
                <button className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-700">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Add Rule</button>
    </div>
  );
}