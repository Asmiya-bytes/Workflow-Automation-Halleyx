// src/controllers/executionController.js
const prisma = require("../utils/prisma");
const { runEngine } = require("../services/runEngine");

exports.runWorkflow = async (req, res) => {
  try {
    // ✅ Get workflow ID from URL param
    const workflow_id = req.params.workflow_id;

    // ✅ Get input data from body
    const inputData = req.body.data || {};

    // ✅ VALIDATION
    if (!workflow_id) {
      return res.status(400).json({ error: "workflow_id missing" });
    }

    // ✅ GET WORKFLOW
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflow_id },
    });

    if (!workflow) {
      return res.status(404).json({ error: "Workflow not found" });
    }

    // ✅ GET STEPS
    const steps = await prisma.step.findMany({
      where: { workflow_id },
    });

    // ✅ GET RULES
    const rules = await prisma.rule.findMany();

    // ✅ RUN ENGINE
    const result = await runEngine(workflow, steps, rules, inputData);

    // ✅ SAVE EXECUTION
    const execution = await prisma.execution.create({
      data: {
        workflow_id,
        workflow_version: workflow.version,
        status: result.status,
        data: JSON.stringify(inputData),
        logs: JSON.stringify(result.logs),
        current_step_id: result.current_step_id || null,
        retries: 0,
        triggered_by: null,
        started_at: new Date(),
        ended_at: result.status === "completed" ? new Date() : null,
      },
    });

    // Return execution with logs
    res.json({
      ...execution,
      logs: result.logs,
    });
  } catch (err) {
    console.error("EXECUTION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};