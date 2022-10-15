const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.book = require("./book.model.js")(mongoose);
db.reader = require("./reader.model.js")(mongoose);

module.exports = db;
