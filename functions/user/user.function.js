const BaseFunctions = require("../base.function");

let _user = null;

module.exports = class UserFunctions extends BaseFunctions {
  constructor({ User }) {
    super(User);
    _user = User;
  }
};