const mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate');

const scheduleSchema = new mongoose.Schema({
    guildID : String,
    guildName : String,
    creator : {type : String, require : true},
    creatorName : String,
    game : String,
    time : String,
    desc : String,
    created :{ type: Date, default: Date.now },
    members : [
        {type : String}
    ],
    membersName : [
        {type : String}
    ]
});
scheduleSchema.plugin(findOrCreate);

const profileSchema = new mongoose.Schema({
    profileID : String,
    guildID : String,
    score : { type: Number, default : 0},
});

profileSchema.plugin(findOrCreate);
module.exports = {
    scheduleSchema, profileSchema
}