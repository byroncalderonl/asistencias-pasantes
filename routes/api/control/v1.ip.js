const { Router } = require("express");

module.exports = function ({ IpController }) {
  const router = Router();

  router.get("/get-all", IpController.getAll);
  router.get("/filter", IpController.findAllWithFilters);
  router.get("/get/:id", IpController.getOne);
  router.post("/create", IpController.create);
  router.put("/update/:id", IpController.update);
  router.delete("/delete/:id", IpController.delete);

  return router;
};
