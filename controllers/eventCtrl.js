const Event = require("../models/event");

const getEvents = async (req, res, next) => {
  let events;
  try {
    const { up = false, past = false, emphasize = false } = req.query;
    const today = new Date().getTime();
    switch (true) {
      case emphasize !== false:
        events = await Event.find({
          $and: [
            { show: true },
            { emphasize: true },
            { startDate: { $gte: today } },
          ],
        }).sort({ startDate: 1 });
        break;
      case up !== false:
        events = await Event.find({
          $and: [{ show: true }, { startDate: { $gte: today } }],
        }).sort({ startDate: 1 });
        break;
      case past !== false:
        events = await Event.find({
          $and: [{ show: true }, { startDate: { $lt: today } }],
        }).sort({ startDate: -1 });
        break;

      default:
        events = await Event.find({
          show: true,
        }).sort({ startDate: 1 });
        break;
    }

    res.json({ today, up, past, emphasize, events: events });
  } catch (error) {
    next(error);
  }
};

module.exports = { getEvents };
