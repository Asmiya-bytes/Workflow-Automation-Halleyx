async function runEngine(workflow, steps, rules, input) {
  let logs = [];

  if (!workflow.start_step_id && steps.length > 0) {
    workflow.start_step_id = steps[0].id;
  }

  let currentStep = steps.find(s => s.id === workflow.start_step_id);

  while (currentStep) {
    logs.push({
      step_name: currentStep.name,
      status: "executed"
    });

    const stepRules = rules
      .filter(r => r.step_id === currentStep.id)
      .sort((a, b) => a.priority - b.priority); // ✅ add this too

    let nextStepId = null;

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

    currentStep = nextStepId
      ? steps.find(s => s.id === nextStepId)
      : null;
  }

  return {
    status: "completed",
    logs
  };
}

// 👇 THIS IS WHERE YOUR FUNCTION GOES
function evalCondition(condition, input) {
  try {
    if (condition === "DEFAULT") return true;

    let expr = condition;

    Object.keys(input).forEach((key) => {
      expr = expr.replaceAll(key, JSON.stringify(input[key]));
    });

    return eval(expr);
  } catch {
    return false;
  }
}

module.exports = { runEngine };