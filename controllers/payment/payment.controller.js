const catchControllerAsync = require("../../utils/catch-controller-async");
const BaseController = require("../base.controller");
const { appResponse } = require("../../utils/app-response");

let _paymentService = null;

module.exports = class PaymentController extends BaseController {
  constructor({ PaymentService }) {
    super(PaymentService);
    _paymentService = PaymentService;
  }

  createPayment = catchControllerAsync(async (req, res) => {
    const { body } = req;
    const result = await _paymentService.createPayment(body);
    return appResponse(res, {
      statusCode: 201,
      status: "success",
      message: "Payment created successfully",
      data: result,
    });
  });
};
