const express = require("express");
const { getEvents } = require("../controllers/eventCtrl");

const router = express.Router();

router.get("/", getEvents);

module.exports = router;
