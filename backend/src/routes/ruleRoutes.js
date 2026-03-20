const router = require("express").Router();
const { addRule } = require("../controllers/ruleController");

router.post("/", addRule);

module.exports = router;