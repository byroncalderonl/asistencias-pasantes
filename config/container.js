const { createContainer, asClass, asValue, asFunction } = require("awilix");

const config = require(".");

const Routes = require("../routes");

const services = require("../services");

const controllers = require("../controllers");

const { Database, Server } = require("../startup");

const routes = require("../routes/api");

const models = require("../models");

const functions = require("../functions");

const { protect } = require("../middleware/authMiddleware");

const container = createContainer();
container
  .register({
    //Configuración principal
    router: asFunction(Routes).singleton(),
    config: asValue(config),
    // AuthUtils: asClass(AuthUtils).singleton(),
    Database: asClass(Database).singleton(),
    Server: asClass(Server).singleton(),
  })
  .register({
    //Configuración de los servicios
    ...Object.keys(services).reduce((acc, serviceName) => {
      acc[serviceName] = asClass(services[serviceName]).singleton();
      return acc;
    }, {}),
  })
  .register({
    //Configuración de los controladores
    ...Object.keys(controllers).reduce((acc, controllerName) => {
      acc[controllerName] = asClass(controllers[controllerName]).singleton();
      return acc;
    }, {}),
  })
  .register({
    //Configuración de rutas
    ...Object.keys(routes).reduce((acc, routeName) => {
      acc[routeName] = asFunction(routes[routeName]).singleton();
      return acc;
    }, {}),
  })
  .register({
    //Configuración de modelos
    ...Object.keys(models).reduce((acc, modelName) => {
      acc[modelName] = asValue(models[modelName]);
      return acc;
    }, {}),
  })
  .register({
    //middlewares
    AuthMiddleware: asFunction(protect).singleton(),
  })
  .register({
    //Configuración de funciones
    ...Object.keys(functions).reduce((acc, functionName) => {
      acc[functionName] = asClass(functions[functionName]).singleton();
      return acc;
    }, {}),
  });

module.exports = container;
