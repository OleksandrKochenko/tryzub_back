const express = require("express");
const { getEvents, getEventById } = require("../controllers/eventCtrl");
const isValidId = require("../midlewares/idValidator");

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", isValidId, getEventById);

module.exports = router;
