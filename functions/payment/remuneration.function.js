const BaseFunctions = require("../base.function");

let _remuneration = null;

module.exports = class RemunerationFunctions extends BaseFunctions {
  constructor({ Remuneration }) {
    super(Remuneration);
    _remuneration = Remuneration;
  }
};
