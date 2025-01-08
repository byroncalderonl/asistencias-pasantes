const catchServiceAsync = require("../../utils/catch-service-async");
const BaseService = require("../base.service");

const AppError = require("../../utils/app-error");

let _workDate = null;
let _workDateFunctions = null;

module.exports = class WorkDateService extends BaseService {
  constructor({ WorkDate, WorkDateFunctions }) {
    super(WorkDate, WorkDateFunctions);
    _workDate = WorkDate;
    _workDateFunctions = WorkDateFunctions;
  }
};
