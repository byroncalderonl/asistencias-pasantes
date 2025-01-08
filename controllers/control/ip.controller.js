const catchControllerAsync = require("../../utils/catch-controller-async");
const BaseController = require("../base.controller");
const { appResponse } = require("../../utils/app-response");

let _ipService = null;

module.exports = class IpController extends BaseController {
  constructor({ IpService }) {
    super(IpService);
    _ipService = IpService;
  }
};
