const catchServiceAsync = require("../../utils/catch-service-async");
const BaseService = require("../base.service");

const AppError = require("../../utils/app-error");

let _rol = null;
let _rolFunctions = null;

module.exports = class RolService extends BaseService {
  constructor({ Rol, RolFunctions }) {
    super(Rol, RolFunctions);
    _rol = Rol;
    _rolFunctions = RolFunctions;
  }
};
