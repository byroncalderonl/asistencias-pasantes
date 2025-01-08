const BaseFunctions = require("../base.function");

let _attendance = null;

module.exports = class AttendanceFunctions extends BaseFunctions {
  constructor({ Attendance }) {
    super(Attendance);
    _attendance = Attendance;
  }
};
