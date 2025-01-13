const catchControllerAsync = require("../../utils/catch-controller-async");
const BaseController = require("../base.controller");
const { appResponse } = require("../../utils/app-response");

let _rolService = null;

module.exports = class RolController extends BaseController {
  constructor({ RolService }) {
    super(RolService);
    _rolService = RolService;
  }
};
