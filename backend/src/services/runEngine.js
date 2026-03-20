// src/services/runEngine.js
async function runEngine(workflow, steps, rules, input) {
  let logs = [];

  // ✅ Ensure start_step_id exists
  if (!workflow.start_step_id && steps.length > 0) {
    workflow.start_step_id = steps[0].id;
  }

  let currentStep = steps.find(s => s.id === workflow.start_step_id);

  while (currentStep) {
    // Log step execution
    logs.push({
      step_name: currentStep.name,
      status: "executed"
    });

    // Find rules for this step
    const stepRules = rules.filter(r => r.step_id === currentStep.id);

    let nextStepId = null;

    if (stepRules.length > 0) {
      for (let rule of stepRules) {
        const result = evalCondition(rule.condition, input);

        logs.push({
          rule: rule.condition,
          result
        });

        if (result) {
          nextStepId = rule.next_step_id;
          break;
        }
      }
    } else {
      // If no rules, move to next step by order
      const currentIndex = steps.findIndex(s => s.id === currentStep.id);
      if (currentIndex + 1 < steps.length) {
        nextStepId = steps[currentIndex + 1].id;
      }
    }

    currentStep = nextStepId ? steps.find(s => s.id === nextStepId) : null;
  }

  return {
    status: "completed",
    logs,
    current_step_id: currentStep?.id || null
  };
}

function evalCondition(condition, input) {
  try {
    const [key, op, value] = condition.split(" ");
    const actual = input[key];

    switch (op) {
      case ">": return actual > Number(value);
      case "<": return actual < Number(value);
      case "==": return actual == value;
      default: return false;
    }
  } catch {
    return false;
  }
}

module.exports = { runEngine };