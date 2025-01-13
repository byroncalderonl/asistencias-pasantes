const catchControllerAsync = require("../../utils/catch-controller-async");
const BaseController = require("../base.controller");
const { appResponse } = require("../../utils/app-response");

let _paymentService = null;

module.exports = class PaymentController extends BaseController {
  constructor({ PaymentService }) {
    super(PaymentService);
    _paymentService = PaymentService;
  }
};
