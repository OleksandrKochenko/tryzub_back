const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const eventsRouter = require("./routes/eventsRouter");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/events", eventsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" }); // send json data instead of html when path not found (not exist)
});

// errors handler
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
