import { useState } from "react";

export default function WorkflowRunForm({ workflow, onStart }) {
  const [inputs, setInputs] = useState(
    Object.fromEntries(Object.keys(workflow.input_schema).map(key => [key, ""]))
  );

  const handleChange = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleRun = () => {
    onStart(inputs); // Pass input data to parent ExecutionView
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl space-y-4">
      <h2 className="text-xl font-semibold">Run Workflow: {workflow.name}</h2>
      {Object.entries(workflow.input_schema).map(([key, val]) => (
        <div key={key}>
          <label className="block font-medium">{key} {val.required && '*'}</label>
          {val.allowed_values ? (
            <select
              value={inputs[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Select</option>
              {val.allowed_values.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : (
            <input
              type={val.type === 'number' ? 'number' : 'text'}
              value={inputs[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="border p-2 rounded w-full"
            />
          )}
        </div>
      ))}
      <button
        onClick={handleRun}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Start Execution
      </button>
    </div>
  );
}