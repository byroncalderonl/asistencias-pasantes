const catchServiceAsync = require("../../utils/catch-service-async");
const BaseService = require("../base.service");

const AppError = require("../../utils/app-error");

let _ip = null;
let _ipFunctions = null;

module.exports = class IpService extends BaseService {
  constructor({ Ip, IpFunctions }) {
    super(Ip, IpFunctions);
    _ip = Ip;
    _ipFunctions = IpFunctions;
  }
};
