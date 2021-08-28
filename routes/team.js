const express = require("express");
const router = express.Router();

const { getTeam } = require("../controllers/teamControl");

router.get("/", getTeam);

module.exports = router;
