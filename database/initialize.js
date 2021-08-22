const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');


const mongoInit = function() {
    mongoose.connect("mongodb+srv://admin-vinroger:vandalisbetterthanphantom57@cluster0.cxva3.mongodb.net/discordBotDB", {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.set("useCreateIndex", true);
}

exports.mongoInit = mongoInit;