import { useState, useEffect } from "react";
import RuleBuilder from "./RuleBuilder";

export default function StepBuilder({ workflowId, refresh }) {
  const [steps, setSteps] = useState([]);
  const [name, setName] = useState("");

  const fetchSteps = () => {
    fetch(`http://localhost:5000/workflows`)
      .then(res => res.json())
      .then(data => {
        const wf = data.find(w => w.id === workflowId);
        if (wf) setSteps(wf.steps);
      });
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const addStep = async () => {
    await fetch("http://localhost:5000/steps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        workflow_id: workflowId,
        name :name,
        step_type: "task"
      })
    });

    setName("");
    fetchSteps();
    refresh();
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h4>Steps</h4>

      <input
        placeholder="Step name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addStep}>Add Step</button>

      {steps.map((step) => (
        <div key={step.id} style={{
          border: "1px solid #ddd",
          padding: 10,
          marginTop: 10,
          borderRadius: 8
        }}>
          <strong>{step.name}</strong>

          {/* RULE BUILDER */}
          <RuleBuilder stepId={step.id} workflowId={workflowId} />
        </div>
      ))}
    </div>
  );
}