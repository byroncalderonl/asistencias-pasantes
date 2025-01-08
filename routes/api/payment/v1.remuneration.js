const { Router } = require("express");

module.exports = function ({ RemunerationController }) {
  const router = Router();

  router.get("/get-all", RemunerationController.getAll);
  router.get("/filter", RemunerationController.findAllWithFilters);
  router.get("/get/:id", RemunerationController.getOne);
  router.post("/create", RemunerationController.create);
  router.put("/update/:id", RemunerationController.update);
  router.delete("/delete/:id", RemunerationController.delete);

  return router;
};
