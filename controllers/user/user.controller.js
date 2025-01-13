const catchControllerAsync = require("../../utils/catch-controller-async");
const BaseController = require("../base.controller");
const { appResponse } = require("../../utils/app-response");

let _userService = null;

module.exports = class UserController extends BaseController {
  constructor({ UserService }) {
    super(UserService);
    _userService = UserService;
  }

  createUser = catchControllerAsync(async (req, res) => {
    const user = await _userService.createUser(req.body);
    return appResponse(res, {
      status: "success",
      message: "User created successfully",
      data: user,
    });
  });

  updateUser = catchControllerAsync(async (req, res) => {
    const { id } = req.params;
    const user = await _userService.updateUser(id, req.body);
    return appResponse(res, {
      status: "success",
      message: "User updated successfully",
      data: user,
    });
  });

  loginUser = catchControllerAsync(async (req, res) => {
    const { userEmail, userPassword } = req.body;
    const { user, token } = await _userService.loginUser(
      userEmail,
      userPassword
    );
    return appResponse(res, {
      status: "success",
      message: "User logged in successfully",
      data: { user, token },
    });
  });

  logoutUser = catchControllerAsync(async (req, res) => {
    const { token } = req.body;
    await _userService.logoutUser(token);
    return appResponse(res, {
      status: "success",
      message: "User logged out successfully",
      data: null,
    });
  });

  getAll = catchControllerAsync(async (req, res) => {
    const users = await _userService.getAllUsersWithRoles();
    return appResponse(res, {
      status: "success",
      message: "Users retrieved successfully",
      data: users,
    });
  });

  findAllWithRolFilters = catchControllerAsync(async (req, res) => {
    const result = await _userService.findAllWithRolFilters(req.query);
    return appResponse(res, {
      status: "success",
      message: "Users filtered by role retrieved successfully",
      data: result,
    });
  });
};
