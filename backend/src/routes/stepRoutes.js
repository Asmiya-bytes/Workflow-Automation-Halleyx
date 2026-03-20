const express = require("express");
const router = express.Router();

const stepController = require("../controllers/stepController");

router.post("/", stepController.createStep); // ✅ correct function

module.exports = router;