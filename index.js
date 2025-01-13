require("dotenv").config();
const container = require("./config/container");
const database = container.resolve("Database");

database.connect();
