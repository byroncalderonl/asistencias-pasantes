const { Router } = require("express");

module.exports = function ({ WorkDateController }) {
  const router = Router();

  router.get("/get-all", WorkDateController.getAll);
  router.get("/filter", WorkDateController.findAllWithFilters);
  router.get("/get/:id", WorkDateController.getOne);
  router.post("/create", WorkDateController.create);
  router.put("/update/:id", WorkDateController.update);
  router.delete("/delete/:id", WorkDateController.delete);

  router.post("/create-workdate", WorkDateController.createWorkDate);
  router.put("/update-workdate/:id", WorkDateController.updateWorkDate);

  return router;
};
