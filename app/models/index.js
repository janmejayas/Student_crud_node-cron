
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONG_URL;
db.users = require("./studentModel.js")(mongoose);

module.exports = db;
