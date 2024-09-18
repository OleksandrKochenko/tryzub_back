const express = require("express");
const {
  getEvents,
  getEventById,
  getNews,
} = require("../controllers/eventCtrl");
const isValidId = require("../midlewares/idValidator");

const router = express.Router();

router.get("/", getEvents);
router.get("/news", getNews);
router.get("/:id", isValidId, getEventById);

module.exports = router;
