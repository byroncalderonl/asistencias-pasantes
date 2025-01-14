const { Router } = require("express");

module.exports = function ({ UserController, AuthMiddleware }) {
  const router = Router();

  router.get("/get-all", UserController.getAll);
  router.get("/filter", UserController.findAllWithRolFilters);
  router.get("/get/:id", UserController.getOne);
  // router.post("/create", [AuthMiddleware], UserController.createUser);
  router.post("/create", UserController.createUser);
  router.put("/update/:id", UserController.updateUser);
  router.delete("/delete/:id", UserController.delete);
  router.post("/login", UserController.loginUser);
  router.post("/logout", UserController.logoutUser);
  return router;
};
