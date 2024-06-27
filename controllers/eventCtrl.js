const httpError = require("../midlewares/httpError");
const Event = require("../models/event");

const getEvents = async (req, res, next) => {
  let events;
  try {
    const { up = false, past = false, emphasize = false } = req.query;
    const today = new Date().getTime();
    switch (true) {
      case emphasize !== false:
        events = await Event.find(
          {
            $and: [
              { show: true },
              { emphasize: true },
              { startDate: { $gte: today } },
            ],
          },
          "-gallery -description -emphasize -show -contacts"
        ).sort({ startDate: 1 });
        break;
      case up !== false:
        events = await Event.find(
          {
            $and: [{ show: true }, { startDate: { $gte: today } }],
          },
          "-description -emphasize -show -contacts"
        ).sort({ startDate: 1 });
        break;
      case past !== false:
        events = await Event.find(
          {
            $and: [{ show: true }, { startDate: { $lt: today } }],
          },
          "-description -emphasize -show -contacts"
        ).sort({ startDate: -1 });
        break;

      default:
        events = await Event.find({
          show: true,
        }).sort({ startDate: 1 });
        break;
    }

    res.json(events);
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      throw httpError(404, `Event with id ${id} not found`);
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
};

module.exports = { getEvents, getEventById };
