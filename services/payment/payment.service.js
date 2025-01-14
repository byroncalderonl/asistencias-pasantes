const catchServiceAsync = require("../../utils/catch-service-async");
const BaseService = require("../base.service");
const Attendance = require("../../models/payment/attendance.models");
const Remuneration = require("../../models/payment/remuneration.models");
const moment = require("moment");

const AppError = require("../../utils/app-error");

let _payment = null;
let _paymentFunctions = null;

module.exports = class PaymentService extends BaseService {
  constructor({ Payment, PaymentFunctions }) {
    super(Payment, PaymentFunctions);
    _payment = Payment;
    _paymentFunctions = PaymentFunctions;
  }

  calculatePaymentTotal = catchServiceAsync(async (userId, paymentDate) => {
    const startOfMonth = moment(paymentDate).startOf("month").toDate();
    const endOfMonth = moment(paymentDate).endOf("month").toDate();

    const attendances = await Attendance.find({
      attendanceUser: userId,
      attendanceDate: { $gte: startOfMonth, $lte: endOfMonth },
    });

    let totalHours = 0;
    attendances.forEach((attendance) => {
      const checkInTime = moment(attendance.checkInTime);
      const checkOutTime = moment(attendance.checkOutTime);
      totalHours += checkOutTime.diff(checkInTime, "hours", true);
    });

    const remuneration = await Remuneration.findOne({
      remunerationStatus: true,
    });
    if (!remuneration) {
      throw new AppError("No active remuneration found", 404);
    }

    return {
      totalHours,
      remunerationAmount: remuneration.remunerationAmount,
      remunerationId: remuneration._id,
    };
  });

  createPayment = catchServiceAsync(async (paymentData) => {
    const { paymentUser, paymentDate } = paymentData;
    const { totalHours, remunerationAmount, remunerationId } =
      await this.calculatePaymentTotal(paymentUser, paymentDate);
    paymentData.paymentTotal = totalHours * remunerationAmount;
    paymentData.paymentRemuneration = remunerationId;
    return await this.model.create(paymentData);
  });
};
