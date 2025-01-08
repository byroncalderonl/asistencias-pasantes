const BaseFunctions = require("../base.function");

let _ip = null;

module.exports = class IpFunctions extends BaseFunctions {
  constructor({ Ip }) {
    super(Ip);
    _ip = Ip;
  }
};
