const catchControllerAsync = require("../../utils/catch-controller-async");
const BaseController = require("../base.controller");
const { appResponse } = require("../../utils/app-response");

let _attendanceService = null;

module.exports = class AttendanceController extends BaseController {
  constructor({ AttendanceService }) {
    super(AttendanceService);
    _attendanceService = AttendanceService;
  }

  create = catchControllerAsync(async (req, res) => {
    const { body } = req;
    const result = await _attendanceService.create(body);
    return appResponse(res, {
      status: "success",
      message: "Entity created successfully",
      data: result,
    });
  });
  
  registerAttendance = catchControllerAsync(async (req, res) => {
    const { codeCard } = req.body;
    const attendance = await _attendanceService.registerAttendance(codeCard);
    return appResponse(res, {
      status: "success",
      message: "Attendance registered successfully",
      data: attendance,
    });
  });

    findAllWithUserFilters = catchControllerAsync(async (req, res) => {
      const result = await _attendanceService.findAllWithUserFilters(req.query);
      return appResponse(res, {
        status: "success",
        message: "Attendance filtered by userName retrieved successfully",
        data: result,
      });
    });
};