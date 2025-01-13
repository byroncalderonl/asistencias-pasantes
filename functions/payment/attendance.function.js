const BaseFunctions = require("../base.function");

let _attendance = null;

module.exports = class AttendanceFunctions extends BaseFunctions {
  constructor({ Attendance }) {
    super(Attendance);
    _attendance = Attendance;
  }

  getPopulateFields() {
    return ["attendanceUser", "paymentRemuneration"];
  }

  getReferenceAttributes() {
    return {
      attendanceUser: ["userName", "userLastName", "userEmail"],
      paymentRemuneration: [
        "remunerationAmount",
        "remunerationDescription",
        "remunerationUser",
      ],
    };
  }
};
