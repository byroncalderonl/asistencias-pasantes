const catchServiceAsync = require("../../utils/catch-service-async");
const BaseService = require("../base.service");

const AppError = require("../../utils/app-error");

let _remuneration = null;
let _remunerationFunctions = null;

module.exports = class RemunerationService extends BaseService {
  constructor({ Remuneration, RemunerationFunctions }) {
    super(Remuneration, RemunerationFunctions);
    _remuneration = Remuneration;
    _remunerationFunctions = RemunerationFunctions;
  }
};
