const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { ErrorMiddleware, NotFoundMiddleware } = require("../middleware");

module.exports = function ({
  RolRoutes,
  UserRoutes,
  AttendanceRoutes,
  PaymentRoutes,
  RemunerationRoutes,
  IpRoutes,
  WorkDateRoutes,
}) {
  const router = express.Router();
  const apiRouter = express.Router();
  apiRouter
    .use(express.json())
    .use(cors())
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }));

  apiRouter.use("/rol", RolRoutes);
  apiRouter.use("/user", UserRoutes);
  apiRouter.use("/attendance", AttendanceRoutes);
  apiRouter.use("/payment", PaymentRoutes);
  apiRouter.use("/remuneration", RemunerationRoutes);
  apiRouter.use("/ip", IpRoutes);
  apiRouter.use("/work-date", WorkDateRoutes);

  router.use("/v1/api", apiRouter);
  router.use("/", (req, res) => {
    res.send("/v1/api");
  });

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
