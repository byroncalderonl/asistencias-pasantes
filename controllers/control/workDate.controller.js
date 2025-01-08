const catchControllerAsync = require("../../utils/catch-controller-async");
const BaseController = require("../base.controller");
const { appResponse } = require("../../utils/app-response");

let _workDateService = null;

module.exports = class WorkDateController extends BaseController {
  constructor({ WorkDateService }) {
    super(WorkDateService);
    _workDateService = WorkDateService;
  }
};
