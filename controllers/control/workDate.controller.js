const catchControllerAsync = require("../../utils/catch-controller-async");
const BaseController = require("../base.controller");
const { appResponse } = require("../../utils/app-response");

let _workDateService = null;

module.exports = class WorkDateController extends BaseController {
  constructor({ WorkDateService }) {
    super(WorkDateService);
    _workDateService = WorkDateService;
  }

  async createWorkDate(req, res) {
    const { body } = req;
    const { updateOthers = true } = body; 
    const createdEntity = await _workDateService.createWorkDate(
      body,
      updateOthers
    );
    return appResponse(res, {
      statusCode: 201,
      status: "success",
      message: "Entity created successfully",
      data: createdEntity,
    });
  }

  async updateWorkDate(req, res) {
    const { id } = req.params;
    const { body } = req;
    const { updateOthers = true } = body;
    const updatedEntity = await _workDateService.updateWorkDate(
      id,
      body,
      updateOthers
    );
    return appResponse(res, {
      statusCode: 200,
      status: "success",
      message: "Entity updated successfully",
      data: updatedEntity,
    });
  }
};
