const prisma = require("../utils/prisma");

// CREATE WORKFLOW
exports.createWorkflow = async (req, res) => {
  try {
    const { name } = req.body;

    const wf = await prisma.workflow.create({
  data: {
    name,
    input_schema: "{}",
    start_step_id: null
  }
});

    res.json(wf);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET ALL WORKFLOWS
exports.getWorkflows = async (req, res) => {
  try {
    const workflows = await prisma.workflow.findMany({
      include: { steps: true }
    });
    res.json(workflows);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};