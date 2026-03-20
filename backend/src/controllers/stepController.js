const prisma = require("../utils/prisma");

exports.createStep = async (req, res) => {
  try {
    const { workflow_id, name, step_type } = req.body;

    // ❗ VALIDATION
    if (!workflow_id || !name) {
      return res.status(400).json({
        error: "workflow_id and name are required"
      });
    }

    // ✅ AUTO ORDER (VERY IMPORTANT)
    const count = await prisma.step.count({
      where: { workflow_id }
    });

    const step = await prisma.step.create({
      data: {
        workflow_id,
        name,
        step_type: step_type || "task",
        order: count + 1   // 👈 AUTO ORDER FIX
      }
    });

    res.json(step);
  } catch (err) {
    console.error("STEP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};