const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.DB_URL;
const connectDb = mongoose.connect(dbUrl)
    .then((e) => { console.log("connected successful to", e.connection.host, e.connection.name); })
    .catch((e) => console.log("Error occured in db! connection", e))
module.exports = {
    connectDb
}