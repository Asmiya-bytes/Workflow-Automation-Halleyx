import { useState } from "react";
import { api } from "../api/api";
import ExecutionViewer from "../components/ExecutionViewer";

export default function Execute() {
  const [workflowId, setWorkflowId] = useState("");
  const [input, setInput] = useState("{}");

  const run = async () => {
    await api.post(`/executions/${workflowId}/execute`, JSON.parse(input));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">Execute Workflow</h1>

      <input
        placeholder="Workflow ID"
        className="border px-2 mb-2 w-full"
        onChange={(e) => setWorkflowId(e.target.value)}
      />

      <textarea
        className="border w-full h-32 mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={run} className="bg-green-500 text-white px-4 py-2">
        Execute
      </button>

      <ExecutionViewer />
    </div>
  );
}