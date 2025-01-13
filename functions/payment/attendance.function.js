const BaseFunctions = require("../base.function");

let _attendance = null;

module.exports = class AttendanceFunctions extends BaseFunctions {
  constructor({ Attendance }) {
    super(Attendance);
    _attendance = Attendance;
  }

  // getPopulateFields() {
  //   return ["attendanceUser", "paymentRemuneration"];
  // }

  // getReferenceAttributes() {
  //   return {
  //     attendanceUser: ["userName", "userLastName", "userEmail"],
  //     paymentRemuneration: [
  //       "remunerationAmount",
  //       "remunerationDescription",
  //       "remunerationUser",
  //     ],
  //   };
  // }

  buildSearchQueryAllUser= async (searchData) => {
    const { limit = 10, page = 1, ...filters } = searchData;

    const query = Object.keys(filters).reduce((acc, key) => {
      const value = filters[key];

      if (typeof value === "boolean") {
        acc[key] = value;
      } else if (value === "true" || value === "false") {
        acc[key] = value === "true";
      } else if (typeof value === "string" && value.trim() !== "") {
        if (key !== "userName") {
          acc[key] = { $regex: value, $options: "i" };
        }
      }
      return acc;
    }, {});

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    return {
      query,
      skip,
      limit: parseInt(limit, 10),
      userName: filters.userName,
    };
  };
};
