const catchControllerAsync = require("../../utils/catch-controller-async");
const BaseController = require("../base.controller");
const { appResponse } = require("../../utils/app-response");

let _remunerationService = null;

module.exports = class RemunerationController extends BaseController {
  constructor({ RemunerationService }) {
    super(RemunerationService);
    _remunerationService = RemunerationService;
  }
};
