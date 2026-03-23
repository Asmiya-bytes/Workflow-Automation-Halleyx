import { useState, useEffect } from "react";
import { API_BASE } from "../config";

export default function RuleBuilder({ stepId, workflowId }) {
  const [condition, setCondition] = useState("");
  const [nextStepId, setNextStepId] = useState("");
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/workflows`)
      .then((res) => res.json())
      .then((data) => {
        const wf = data.find((w) => w.id === workflowId);
        if (wf) setSteps(wf.steps);
      });
  }, []);

  const createRule = async () => {
    if (!condition || !nextStepId) {
      return alert("Fill all fields");
    }

    await fetch(`${API_BASE}/rules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        step_id: stepId,
        condition,
        next_step_id: nextStepId,
        priority: 1,
      }),
    });

    alert("Rule added ✅");
    setCondition("");
    setNextStepId("");
  };

  return (
    <div className="rule">
      <input
        placeholder="amount > 1000"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      />

      <select
        value={nextStepId}
        onChange={(e) => setNextStepId(e.target.value)}
      >
        <option value="">Next Step</option>
        {steps.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button onClick={createRule}>Add Rule</button>
    </div>
  );
}