const express = require("express");
const router = express.Router();

const workflowController = require("../controllers/workflowController");

// ✅ CORRECT ROUTES
router.post("/", workflowController.createWorkflow);
router.get("/", workflowController.getWorkflows);

module.exports = router;