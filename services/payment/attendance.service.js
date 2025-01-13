const catchServiceAsync = require("../../utils/catch-service-async");
const BaseService = require("../base.service");

const AppError = require("../../utils/app-error");
const User = require("../../models/user/user.models");
const WorkDate = require("../../models/control/workDate.models");
let _attendance = null;
let _attendanceFunctions = null;

const {
  formatToQuitoTime,
  getStartOfDay,
  getEndOfDay,
  formatDateTime,
} = require("../../utils/date-utils");

module.exports = class AttendanceService extends BaseService {
  constructor({ Attendance, AttendanceFunctions }) {
    super(Attendance, AttendanceFunctions);
    _attendance = Attendance;
    _attendanceFunctions = AttendanceFunctions;
  }

  async verifyUserByCodeCard(codeCard) {
    const user = await User.findOne({ codeCard });
    if (!user) {
      throw new AppError("User not found with this code card", 404);
    }
    return user;
  }

  async getWorkDate() {
    const workDate = await WorkDate.findOne({ workStatus: true }).sort({
      createdAt: -1,
    });
    if (!workDate) {
      throw new AppError("Work date not found", 404);
    }
    return workDate;
  }

  async getTodayAttendance(userId) {
    const workDate = await this.getWorkDate();
    const startOfDay = getStartOfDay(workDate.workStartTime);
    const endOfDay = getEndOfDay(workDate.workEndTime);

    return await _attendance.findOne({
      attendanceUser: userId,
      attendanceDate: { $gte: startOfDay, $lte: endOfDay },
    });
  }

  async registerAttendance(codeCard) {
    const user = await this.verifyUserByCodeCard(codeCard);
    const workDate = await this.getWorkDate();
    const currentTime = formatDateTime(new Date());

    const workStartTime = formatDateTime(workDate.workStartTime);
    const workEndTime = formatDateTime(workDate.workEndTime);

    if (currentTime < workStartTime || currentTime > workEndTime) {
      throw new AppError("Current time is outside of work hours", 400);
    }

    const todayAttendance = await this.getTodayAttendance(user._id);

    if (todayAttendance) {
      if (todayAttendance.checkInTime && todayAttendance.checkOutTime) {
        throw new AppError("Attendance already registered for today", 400);
      } else if (todayAttendance.checkInTime) {
        todayAttendance.checkOutTime = currentTime;
        await todayAttendance.save();
        return todayAttendance;
      }
    }

    const attendanceData = {
      attendanceUser: user._id,
      attendanceDate: currentTime,
      checkInTime: currentTime,
      attendanceStatus: true,
      attendanceCard: codeCard,
    };
    const attendance = new _attendance(attendanceData);
    await attendance.save();
    return attendance;
  }

  create = catchServiceAsync(async (entity) => {
    const workDate = await this.getWorkDate();
    const currentTime = formatDateTime(new Date());

    const workStartTime = formatDateTime(workDate.workStartTime);
    const workEndTime = formatDateTime(workDate.workEndTime);
    
    if (currentTime < workStartTime || currentTime > workEndTime) {
      throw new AppError("Current time is outside of work hours", 400);
    }

    const todayAttendance = await this.getTodayAttendance(
      entity.attendanceUser
    );

    if (todayAttendance) {
      if (todayAttendance.checkInTime && todayAttendance.checkOutTime) {
        throw new AppError("Attendance already registered for today", 400);
      } else if (todayAttendance.checkInTime) {
        todayAttendance.checkOutTime = currentTime;
        await todayAttendance.save();
        return todayAttendance;
      }
    }

    entity.attendanceDate = currentTime;
    entity.checkInTime = currentTime;
    return await this.model.create(entity);
  });
};
