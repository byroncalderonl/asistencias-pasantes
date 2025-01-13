const { Router } = require("express");
// const { protect } = require("../../../middleware/authMiddleware");

module.exports = function ({ UserController, config, User, AuthMiddleware }) {
  const router = Router();

  router.get("/get-all", UserController.getAll);
  router.get("/filter", UserController.findAllWithFilters);
  router.get("/get/:id", UserController.getOne);
  // router.post("/create", protect({ User, config }), UserController.createUser);
  router.post("/create", [AuthMiddleware], UserController.createUser);

  router.put("/update/:id", UserController.updateUser);
  router.delete("/delete/:id", UserController.delete);
  router.post("/login", UserController.loginUser);
  router.post("/logout", UserController.logoutUser);

  return router;
};
