const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = ({ User, config }) =>
  asyncHandler(async (req, res, next) => {
    let token = req.headers["x-api-key"];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findOne({ _id: decoded.id }).select("-password");
        next();
      } catch (error) {
        console.log(error);
        res.status(401).json({
          statusCode: 401,
          status: "fail",
          message: "No autorizado",
          data: {},
        });
      }
    } else {
      res.status(401).json({
        statusCode: 401,
        status: "fail",
        message: "No autorizado, no se envió el token",
        data: {},
      });
    }
  });

module.exports = { protect };
