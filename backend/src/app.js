const express = require("express");
const cors = require("cors");

const workflowRoutes = require("./routes/workflowRoutes");
const stepRoutes = require("./routes/stepRoutes");
const ruleRoutes = require("./routes/ruleRoutes");
const executionRoutes = require("./routes/executionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROUTES
app.use("/workflows", workflowRoutes);
app.use("/steps", stepRoutes);
app.use("/rules", ruleRoutes);
app.use("/executions", executionRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("🚀 Workflow Engine API Running");
});

module.exports = app;