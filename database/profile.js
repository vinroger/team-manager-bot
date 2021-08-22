const mongoose = require("mongoose");
const schema = require(__dirname +'/schema.js')
const profile = mongoose.model("profile", schema.profileSchema );
module.exports = profile;
