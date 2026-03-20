const prisma = require("../utils/prisma");

exports.addRule = async (req, res) => {
  try {
    const { step_id, condition, next_step_id, priority } = req.body;

    if (!step_id || !condition) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const rule = await prisma.rule.create({
      data: {
        step_id,
        condition,
        next_step_id: next_step_id || null,
        priority: priority || 1
      }
    });

    res.json(rule);

  } catch (err) {
    console.error("RULE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};