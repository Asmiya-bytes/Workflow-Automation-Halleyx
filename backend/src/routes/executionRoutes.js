// src/routes/executionRoutes.js
const express = require("express");
const router = express.Router();
const { runWorkflow } = require("../controllers/executionController");

// Run workflow by ID (from URL param)
router.post("/run/:workflow_id", runWorkflow);

module.exports = router;