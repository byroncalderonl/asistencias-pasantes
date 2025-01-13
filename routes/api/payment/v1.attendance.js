const { Router } = require("express");

module.exports = function ({ AttendanceController }) {
  const router = Router();

  router.get("/get-all", AttendanceController.getAll);
  router.get("/filter", AttendanceController.findAllWithFilters);
  router.get("/get/:id", AttendanceController.getOne);
  router.post("/create", AttendanceController.create);
  router.post("/create-card", AttendanceController.registerAttendance);
  router.put("/update/:id", AttendanceController.update);
  router.delete("/delete/:id", AttendanceController.delete);

  return router;
};
