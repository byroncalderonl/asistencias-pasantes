const BaseFunctions = require("../base.function");

let _payment = null;

module.exports = class PaymentFunctions extends BaseFunctions {
  constructor({ Payment }) {
    super(Payment);
    _payment = Payment;
  }
};
