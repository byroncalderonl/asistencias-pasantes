const BaseFunctions = require("../base.function");

let _rol = null;

module.exports = class RolFunctions extends BaseFunctions {
  constructor({ Rol }) {
    super(Rol);
    _rol = Rol;
  }
};
