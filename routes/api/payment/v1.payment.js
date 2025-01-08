const { Router } = require("express");

module.exports = function ({ PaymentController }) {
  const router = Router();

  router.get("/get-all", PaymentController.getAll);
  router.get("/filter", PaymentController.findAllWithFilters);
  router.get("/get/:id", PaymentController.getOne);
  router.post("/create", PaymentController.create);
  router.put("/update/:id", PaymentController.update);
  router.delete("/delete/:id", PaymentController.delete);

  return router;
};
