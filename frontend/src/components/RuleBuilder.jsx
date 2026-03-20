import { useState, useEffect } from "react";

export default function RuleBuilder({ stepId, workflowId }) {
  const [condition, setCondition] = useState("");
  const [nextStepId, setNextStepId] = useState("");
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/workflows")
      .then(res => res.json())
      .then(data => {
        const wf = data.find(w => w.id === workflowId);
        if (wf) setSteps(wf.steps);
      });
  }, []);

  const createRule = async () => {
    if (!condition || !nextStepId) {
      return alert("Fill all fields");
    }

    const res = await fetch("http://localhost:5000/rules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        step_id: stepId,
        condition,
        next_step_id: nextStepId,
        priority: 1
      })
    });

    const data = await res.json();
    console.log(data);

    alert("Rule added ✅");

    setCondition("");
    setNextStepId("");
  };

  return (
    <div style={{
      marginTop: 10,
      background: "#fafafa",
      padding: 10,
      borderRadius: 8
    }}>
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
        {steps.map(s => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button onClick={createRule}>Add Rule</button>
    </div>
  );
}