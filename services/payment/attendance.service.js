const catchServiceAsync = require("../../utils/catch-service-async");
const BaseService = require("../base.service");

const AppError = require("../../utils/app-error");

let _attendance = null;
let _attendanceFunctions = null;

module.exports = class AttendanceService extends BaseService {
  constructor({ Attendance, AttendanceFunctions }) {
    super(Attendance, AttendanceFunctions);
    _attendance = Attendance;
    _attendanceFunctions = AttendanceFunctions;
  }
};
