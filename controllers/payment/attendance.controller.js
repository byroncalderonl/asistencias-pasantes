const catchControllerAsync = require("../../utils/catch-controller-async");
const BaseController = require("../base.controller");
const { appResponse } = require("../../utils/app-response");

let _attendanceService = null;

module.exports = class AttendanceController extends BaseController {
  constructor({ AttendanceService }) {
    super(AttendanceService);
    _attendanceService = AttendanceService;
  }
};