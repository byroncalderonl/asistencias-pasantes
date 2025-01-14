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

  async createRemuneration(entity, updateOthers = true) {
    if (entity.remunerationStatus && updateOthers) {
      const result = await _remuneration.updateMany(
        { remunerationStatus: true },
        { remunerationStatus: false }
      );
      const createdEntity = await _remuneration.create(entity);
      return createdEntity;
    }
  }

  async updateRemuneration(id, entity, updateOthers = true) {
    if (entity.remunerationStatus && updateOthers) {
      const result = await _remuneration.updateMany(
        { remunerationStatus: true },
        { remunerationStatus: false }
      );
    }
    const updatedEntity = await _remuneration.findByIdAndUpdate(id, entity, {
      new: true,
    });
    return updatedEntity;
  }
};
