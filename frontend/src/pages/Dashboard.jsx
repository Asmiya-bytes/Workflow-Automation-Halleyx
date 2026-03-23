import { useEffect, useState } from "react";
import StepBuilder from "../components/StepBuilder";
import { API_BASE } from "../config";

export default function Dashboard() {
  const [workflows, setWorkflows] = useState([]);
  const [name, setName] = useState("");
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState({ amount: "" });

  const fetchWorkflows = () => {
    fetch(`${API_BASE}/workflows`)
      .then((res) => res.json())
      .then((data) => setWorkflows(data));
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const createWorkflow = async () => {
    if (!name) return alert("Enter workflow name");

    await fetch(`${API_BASE}/workflows`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    fetchWorkflows();
  };

  const runWorkflow = async (id) => {
    const res = await fetch(`${API_BASE}/executions/run/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: { amount: Number(input.amount) },
      }),
    });

    const data = await res.json();

    if (data.logs) {
      setLogs(data.logs);
    } else {
      alert(data.error || "Execution failed");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚙️ Workflow Engine</h1>

      {/* CREATE */}
      <div style={styles.card}>
        <h3>Create Workflow</h3>
        <input
          style={styles.input}
          placeholder="Workflow Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button style={styles.button} onClick={createWorkflow}>
          Create
        </button>
      </div>

      {/* INPUT */}
      <div style={styles.card}>
        <h3>Execution Input</h3>
        <input
          style={styles.input}
          placeholder="Amount"
          value={input.amount}
          onChange={(e) => setInput({ amount: e.target.value })}
        />
      </div>

      {/* WORKFLOWS */}
      {workflows.map((wf) => (
        <div key={wf.id} style={styles.card}>
          <h2>{wf.name}</h2>

          <StepBuilder workflowId={wf.id} refresh={fetchWorkflows} />

          <button style={styles.runButton} onClick={() => runWorkflow(wf.id)}>
            ▶ Run Workflow
          </button>
        </div>
      ))}

      {/* LOGS */}
      <div style={styles.card}>
        <h3>📜 Execution Logs</h3>

        {logs.length === 0 ? (
          <p>No execution yet</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} style={styles.log}>
              {log.step_name && (
                <p>
                  <b>Step:</b> {log.step_name}
                </p>
              )}
              {log.rule && (
                <p>
                  <b>Rule:</b> {log.rule}
                </p>
              )}
              {log.status && (
                <p>
                  <b>Status:</b> {log.status}
                </p>
              )}
              {log.result !== undefined && (
                <p>
                  <b>Result:</b> {log.result.toString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 🎨 INLINE STYLES
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #ffd6e0, #c6f1ff, #fff2c6)",
  },

  title: {
    color: "white",
    marginBottom: "30px",
    fontSize: "32px",
    fontWeight: "bold",
  },

  card: {
    background: "white",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "70%", // ✅ FIXED WIDTH (not too long)
    margin: "10px auto", // ✅ CENTERED
    display: "block",
    textAlign: "center",
    fontSize: "14px",
  },

  button: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },

  runButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #11998e, #38ef7d)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "15px",
  },

  log: {
    background: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
    padding: "12px",
    borderRadius: "10px",
    marginTop: "10px",
    textAlign: "left",
  },
};
