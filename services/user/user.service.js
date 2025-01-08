const catchServiceAsync = require("../../utils/catch-service-async");
const BaseService = require("../base.service");

const AppError = require("../../utils/app-error");

let _user = null;
let _userFunctions = null;

module.exports = class UserService extends BaseService {
  constructor({ User, UserFunctions }) {
    super(User, UserFunctions);
    _user = User;
    _userFunctions = UserFunctions;
  }
};
