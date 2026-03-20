import { useEffect, useState } from "react";
import StepBuilder from "../components/StepBuilder";

export default function Dashboard() {
  const [workflows, setWorkflows] = useState([]);
  const [name, setName] = useState("");
  const [logs, setLogs] = useState([]);

  const fetchWorkflows = () => {
    fetch("http://localhost:5000/workflows")
      .then((res) => res.json())
      .then((data) => setWorkflows(data));
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const createWorkflow = async () => {
    if (!name) return alert("Enter workflow name");

    await fetch("http://localhost:5000/workflows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    fetchWorkflows();
  };

  const runWorkflow = async (id) => {
    const res = await fetch(`http://localhost:5000/executions/run/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1500 }),
    });
    const data = await res.json();

    if (data.logs) {
      const stepStatuses = data.logs
        .filter((log) => log.step_name)
        .map((log) => `${log.step_name}: ${log.status}`)
        .join("\n");
      alert(stepStatuses);
    } else {
      alert(data.error || "Execution failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 30,
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg, #ffd6e0, #c6f1ff, #fff2c6)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#333", marginBottom: 30 }}>⚙️ Workflow Engine</h1>

      {/* CREATE WORKFLOW */}
      <div
        style={{
          background: "#ffffffcc",
          padding: 25,
          borderRadius: 15,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          marginBottom: 30,
          width: "400px",
        }}
      >
        <h3 style={{ color: "#555" }}>Create Workflow</h3>
        <input
          placeholder="Workflow Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #ccc",
            marginRight: 10,
            width: "60%",
          }}
        />
        <button
          onClick={createWorkflow}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#a3cef1",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Create
        </button>
      </div>

      {/* WORKFLOWS */}
      {workflows.map((wf) => (
        <div
          key={wf.id}
          style={{
            background: "#ffffffcc",
            padding: 25,
            borderRadius: 15,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            marginBottom: 20,
            width: "500px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#444" }}>{wf.name}</h2>

          {/* Steps */}
          <StepBuilder workflowId={wf.id} refresh={fetchWorkflows} />

          <button
            onClick={() => runWorkflow(wf.id)}
            style={{
              marginTop: 15,
              backgroundColor: "#ffb6b9",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ▶ Run Workflow
          </button>
        </div>
      ))}

      {/* LOGS PANEL */}
      <div
        style={{
          background: "#ffffffcc",
          padding: 25,
          borderRadius: 15,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginTop: 30,
          width: "500px",
          textAlign: "center",
        }}
      >
        <h3 style={{ color: "#555" }}>📜 Execution Logs</h3>

        {logs.length === 0 ? (
          <p style={{ color: "#666" }}>No execution yet</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {logs.map((log, i) => (
              <li key={i} style={{ marginBottom: 6, color: "#333" }}>
                {log.step_name && `Step: ${log.step_name}`}{" "}
                {log.rule && `Rule: ${log.rule}`} →{" "}
                {log.status || log.result.toString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}