const { isValidObjectId } = require("mongoose");
const httpError = require("./httpError");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(httpError(404, `${id} - Invalid id format`));
  }
  next();
};

module.exports = isValidId;
