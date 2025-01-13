const catchServiceAsync = require("../../utils/catch-service-async");
const BaseService = require("../base.service");

const AppError = require("../../utils/app-error");
const { formatDateTime } = require("../../utils/date-utils");

let _workDate = null;
let _workDateFunctions = null;

module.exports = class WorkDateService extends BaseService {
  constructor({ WorkDate, WorkDateFunctions }) {
    super(WorkDate, WorkDateFunctions);
    _workDate = WorkDate;
    _workDateFunctions = WorkDateFunctions;
  }

  async createWorkDate(entity, updateOthers = true) {
    if (entity.workStatus && updateOthers) {
      const result = await _workDate.updateMany(
        { workStatus: true },
        { workStatus: false }
      );
      entity.workStartTime = formatDateTime(entity.workStartTime);
      entity.workEndTime = formatDateTime(entity.workEndTime);
      const createdEntity = await _workDate.create(entity);
      return createdEntity;
    }
  }

  async updateWorkDate(id, entity, updateOthers = true) {
    if (entity.workStatus && updateOthers) {
      const result = await _workDate.updateMany(
        { workStatus: true },
        { workStatus: false }
      );
    }
    if (entity.workStartTime) {
      entity.workStartTime = formatDateTime(entity.workStartTime);
    }
    if (entity.workEndTime) {
      entity.workEndTime = formatDateTime(entity.workEndTime);
    }
    const updatedEntity = await _workDate.findByIdAndUpdate(id, entity, {
      new: true,
    });
    return updatedEntity;
  }
};
