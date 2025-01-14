const catchControllerAsync = require("../../utils/catch-controller-async");
const BaseController = require("../base.controller");
const { appResponse } = require("../../utils/app-response");

let _remunerationService = null;

module.exports = class RemunerationController extends BaseController {
  constructor({ RemunerationService }) {
    super(RemunerationService);
    _remunerationService = RemunerationService;
  }

  async createRemuneration(req, res) {
    const { body } = req;
    const { updateOthers = true } = body;
    const createdEntity = await _remunerationService.createRemuneration(
      body,
      updateOthers
    );
    return appResponse(res, {
      status: "success",
      message: "Entity created successfully",
      data: createdEntity,
    });
  }

  async updateRemuneration(req, res) {
    const { id } = req.params;
    const { body } = req;
    const { updateOthers = true } = body; 
    const updatedEntity = await _remunerationService.updateRemuneration(
      id,
      body,
      updateOthers
    );
    return appResponse(res, {
      status: "success",
      message: "Entity updated successfully",
      data: updatedEntity,
    });
  }
};
