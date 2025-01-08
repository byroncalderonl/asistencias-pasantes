const catchServiceAsync = require("../../utils/catch-service-async");
const BaseService = require("../base.service");

const AppError = require("../../utils/app-error");

let _payment = null;
let _paymentFunctions = null;

module.exports = class PaymentService extends BaseService {
  constructor({ Payment, PaymentFunctions }) {
    super(Payment, PaymentFunctions);
    _payment = Payment;
    _paymentFunctions = PaymentFunctions;
  }
};
