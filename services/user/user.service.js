const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchServiceAsync = require("../../utils/catch-service-async");
const BaseService = require("../base.service");
const AppError = require("../../utils/app-error");

let _user = null;
let _userFunctions = null;
const revokedTokens = new Set(); // Lista en memoria para tokens revocados

module.exports = class UserService extends BaseService {
  constructor({ User, UserFunctions }) {
    super(User, UserFunctions);
    _user = User;
    _userFunctions = UserFunctions;
  }

  async createUser(userData) {
    const salt = await bcrypt.genSalt(10);
    userData.userPassword = await bcrypt.hash(userData.userPassword, salt);
    const user = new _user(userData);
    return await user.save();
  }

  async updateUser(userId, userData) {
    if (userData.userPassword) {
      const salt = await bcrypt.genSalt(10);
      userData.userPassword = await bcrypt.hash(userData.userPassword, salt);
    }
    return await _user.findByIdAndUpdate(userId, userData, { new: true });
  }

  async loginUser(email, password) {
    const user = await _user.findOne({ userEmail: email });
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await bcrypt.compare(password, user.userPassword);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { user, token };
  }

  async logoutUser(token) {
    revokedTokens.add(token);
    return true;
  }

  isTokenRevoked(token) {
    return revokedTokens.has(token);
  }

  async getAllUsersWithRoles() {
    return await _user.find().populate("userRol", "rolName rolDescription");
  }

  // async findAllWithRolFilters(filters) {
  //   const { query, limit, skip } = await this.functions.buildSearchQueryAllRol(
  //     filters
  //   );

  //   const totalCount = await this.model.countDocuments(query);
  //   const result = await this.model
  //     .find(query)
  //     .populate("userRol", "rolName rolDescription")
  //     .sort({ createdAt: -1 })
  //     .limit(limit)
  //     .skip(skip);

  //   return { result, totalCount };
  // }

  async findAllWithRolFilters(filters) {
    const { query, limit, skip, rolName } =
      await this.functions.buildSearchQueryAllRol(filters);

    const totalCount = await this.model.countDocuments(query);
    const result = await this.model
      .find(query)
      .populate({
        path: "userRol",
        match: rolName ? { rolName: { $regex: rolName, $options: "i" } } : {},
        select: "rolName rolDescription",
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    // Filtrar los resultados que no coinciden con el rolName
    const filteredResult = result.filter((user) => user.userRol);

    return { result: filteredResult, totalCount: filteredResult.length };
  }
};
