const BaseFunctions = require("../base.function");

let _workDate = null;

module.exports = class WorkDateFunctions extends BaseFunctions {
  constructor({ WorkDate }) {
    super(WorkDate);
    _workDate = WorkDate;
  }
};
