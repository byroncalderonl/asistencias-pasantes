module.exports = class BaseFunctions {
  constructor(model) {
    this.model = model;
  }


  //para todo:
  buildSearchQuery = async (searchData) => {
    const { limit = 10, page = 1, ...filters } = searchData;

    const query = Object.keys(filters).reduce((acc, key) => {
      const value = filters[key];

      if (typeof value === "boolean") {
        acc[key] = value;
      } else if (value === "true" || value === "false") {
        acc[key] = value === "true";
      } else if (typeof value === "string" && value.trim() !== "") {
        acc[key] = { $regex: value, $options: "i" };
      }
      return acc;
    }, {});

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    return { query, skip, limit: parseInt(limit, 10) };
  };

  //experimental filtro
  // buildPopulateQuery = (populateFields) => {
  //   return populateFields.map((field) => ({ path: field }));
  // };

  // selectAttributes = (attributes) => {
  //   return attributes.join(" ");
  // };

  // buildSearchQueryWithPopulate = async (searchData) => {
  //   const { limit = 10, page = 1, ...filters } = searchData;

  //   const query = Object.keys(filters).reduce((acc, key) => {
  //     if (filters[key]) {
  //       acc[key] = { $regex: filters[key], $options: "i" };
  //     }
  //     return acc;
  //   }, {});

  //   const skip = (parseInt(page) - 1) * parseInt(limit);
  //   const populateFields = this.getPopulateFields();
  //   const referenceAttributes = this.getReferenceAttributes();
  //   const populate = this.buildPopulateQuery(populateFields);
  //   const select = this.selectAttributes(
  //     Object.values(referenceAttributes).flat()
  //   );

  //   // Añadir filtros para los campos de referencia
  //   populateFields.forEach((field) => {
  //     const refAttributes = referenceAttributes[field];
  //     refAttributes.forEach((attr) => {
  //       if (filters[attr]) {
  //         query[`${field}.${attr}`] = { $regex: filters[attr], $options: "i" };
  //       }
  //     });
  //   });

  //   return { query, skip, limit: parseInt(limit), populate, select };
  // };
};
