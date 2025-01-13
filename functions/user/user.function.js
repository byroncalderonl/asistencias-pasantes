const BaseFunctions = require("../base.function");

let _user = null;

module.exports = class UserFunctions extends BaseFunctions {
  constructor({ User }) {
    super(User);
    _user = User;
  }

  // buildSearchQueryAllRol = async (searchData) => {
  //   const { limit = 10, page = 1, ...filters } = searchData;

  //   const query = Object.keys(filters).reduce((acc, key) => {
  //     const value = filters[key];

  //     if (typeof value === "boolean") {
  //       acc[key] = value;
  //     } else if (value === "true" || value === "false") {
  //       acc[key] = value === "true";
  //     } else if (typeof value === "string" && value.trim() !== "") {
  //       acc[key] = { $regex: value, $options: "i" };
  //     }
  //     return acc;
  //   }, {});

  //   const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

  //   return { query, skip, limit: parseInt(limit, 10) };
  // };

  buildSearchQueryAllRol = async (searchData) => {
    const { limit = 10, page = 1, ...filters } = searchData;

    const query = Object.keys(filters).reduce((acc, key) => {
      const value = filters[key];

      if (typeof value === "boolean") {
        acc[key] = value;
      } else if (value === "true" || value === "false") {
        acc[key] = value === "true";
      } else if (typeof value === "string" && value.trim() !== "") {
        if (key !== "rolName") {
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
      rolName: filters.rolName,
    };
  };
};
