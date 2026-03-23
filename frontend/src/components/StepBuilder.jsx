import { useState, useEffect } from "react";
import RuleBuilder from "./RuleBuilder";
import { API_BASE } from "../config";

export default function StepBuilder({ workflowId, refresh }) {
  const [steps, setSteps] = useState([]);
  const [name, setName] = useState("");

  const fetchSteps = () => {
    fetch(`${API_BASE}/workflows`)
      .then((res) => res.json())
      .then((data) => {
        const wf = data.find((w) => w.id === workflowId);
        if (wf) setSteps(wf.steps);
      });
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const addStep = async () => {
    if (!name) return;

    await fetch(`${API_BASE}/steps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workflow_id: workflowId,
        name,
        step_type: "task",
      }),
    });

    setName("");
    fetchSteps();
    refresh();
  };

  return (
    <div>
      <h4>Steps</h4>

      <input
        placeholder="Step name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addStep}>Add Step</button>

      {steps.map((step) => (
        <div key={step.id} className="step">
          <strong>{step.name}</strong>

          <RuleBuilder stepId={step.id} workflowId={workflowId} />
        </div>
      ))}
    </div>
  );
}