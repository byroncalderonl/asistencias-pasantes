const AppError = require("../utils/app-error");
const catchServiceAsync = require("../utils/catch-service-async");

module.exports = class BaseService {
  constructor(model, functions) {
    this.model = model;
    this.functions = functions;
  }

  getOne = catchServiceAsync(async (id) => {
    if (!id) {
      throw new AppError("Id must be sent", 400);
    }
    const currentEntity = await this.model.findById(id);
    if (!currentEntity) {
      throw new AppError("Entity not found", 404);
    }
    return currentEntity;
  });

  getAll = catchServiceAsync(async (limit = 10, pageNum = 1) => {
    const pagination = limit * (pageNum - 1);
    const totalCount = await this.model.countDocuments();
    const result = await this.model
      .find()
      .lean()
      .skip(pagination)
      .limit(limit)
      .sort({ createdAt: -1 });
    return { result, totalCount };
  });

  create = catchServiceAsync(async (entity) => {
    return await this.model.create(entity);
  });

  update = catchServiceAsync(async (id, entity) => {
    if (!id) {
      throw new AppError("Id must be sent", 400);
    }
    const updatedEntity = await this.model.findByIdAndUpdate(id, entity, {
      new: true,
      runValidators: true,
    });
    if (!updatedEntity) {
      throw new AppError("Entity not found", 404);
    }
    return updatedEntity;
  });

  delete = catchServiceAsync(async (id) => {
    if (!id) {
      throw new AppError("Id must be sent", 400);
    }
    const deletedEntity = await this.model.findByIdAndDelete(id);
    if (!deletedEntity) {
      throw new AppError("Entity not found", 404);
    }
    return deletedEntity;
  });

  //funcional

  findAllWithFilters = catchServiceAsync(async (filters) => {
    const { query, limit, skip } = await this.functions.buildSearchQuery(
      filters
    );

    const totalCount = await this.model.countDocuments(query);
    const result = await this.model
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    return { result, totalCount };
  });

  //experimental
  // findAllWithFilters = catchServiceAsync(async (filters) => {
  //   const { query, limit, skip, populate, select } =
  //     await this.functions.buildSearchQueryWithPopulate(filters);

  //   const totalCount = await this.model.countDocuments(query);
  //   let resultQuery = this.model
  //     .find(query)
  //     .sort({ createdAt: -1 })
  //     .limit(limit)
  //     .skip(skip);
  //   if (populate.length) {
  //     resultQuery = resultQuery.populate(populate);
  //   }
  //   if (select) {
  //     resultQuery = resultQuery.select(select);
  //   }
  //   const result = await resultQuery;

  //   return { result, totalCount };
  // });
};
