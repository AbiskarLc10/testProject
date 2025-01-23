require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelizeConfig = require("../config/database.json");
const environment = process.env.ENVIRONMENT || "development";
const config = sequelizeConfig[environment];

const sequelize = new Sequelize({
  host: config.host || "localhost",
  username: config.username || "root",
  password: config.password || "password",
  database: config.database || "db1",
  dialect: config.dialect || "mysql",
});

console.log(sequelize);
module.exports = sequelize;
