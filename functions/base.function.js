module.exports = class BaseFunctions {
  constructor(model) {
    this.model = model;
  }

  buildSearchQuery = async (searchData) => {
    const { limit = 10, page = 1, ...filters } = searchData;

    const query = Object.keys(filters).reduce((acc, key) => {
      if (filters[key]) {
        acc[key] = { $regex: filters[key], $options: "i" };
      }
      return acc;
    }, {});

    const skip = (parseInt(page) - 1) * parseInt(limit);

    return { query, skip, limit: parseInt(limit) };
  };
};
