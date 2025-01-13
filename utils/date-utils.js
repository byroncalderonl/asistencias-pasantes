const moment = require("moment-timezone");

const formatToQuitoTime = (date) => {
  return moment.tz(date, "America/Guayaquil").toDate();
};

const getStartOfDay = (date) => {
  return moment.tz(date, "America/Guayaquil").startOf("day").toDate();
};

const getEndOfDay = (date) => {
  return moment.tz(date, "America/Guayaquil").endOf("day").toDate();
};

const formatDateTime = (date) => {
  return moment.tz(date, "America/Guayaquil").format("YYYY-MM-DD HH:mm:ss");
};

module.exports = {
  formatToQuitoTime,
  getStartOfDay,
  getEndOfDay,
  formatDateTime,
};
