const mongoose = require("mongoose");
const schema = require(__dirname +'/schema.js')
const schedule = mongoose.model("schedule", schema.scheduleSchema );
module.exports = schedule;
