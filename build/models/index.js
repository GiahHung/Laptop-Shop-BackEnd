"use strict";

require("dotenv").config();
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var process = require("process");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + '/../../config.js')[env];
var db = {};
var sequelize;
// const customizeConfig = {
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_dialect,
//   logging: false,
//   query: {
//     raw: true,
//   },
//   timezone: "+07:00",
// };
// sequelize = new Sequelize(
//   process.env.DB_DATABASE_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   customizeConfig
// );
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1;
}).forEach(function (file) {
  var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;