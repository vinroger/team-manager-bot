const Schedule = require(process.cwd()+"/database/schedule.js");
const Guild = require(process.cwd()+"/database/profile.js");
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock } = require('@discordjs/builders');
const _ = require("lodash");
const coutTable = require(__dirname +"/coutTable.js");
const client = require(process.cwd()+"/app.js");
var findOrCreate = require('mongoose-findorcreate');
const Profile = require(process.cwd()+"/database/profile.js");

module.exports = {
    name: 'join',
    description: "join a schedule",
    async execute(message, args){

        let username = "<@" + message.author.id + ">";
        let sliced = message.content.slice(5);
        let target = _.trimEnd(_.trimStart(sliced));
        let guildID = message.guild.id;
		let guildName = message.guild.name;
        target = target.replace('!','');
		

        await Schedule.findOne({
            creator : target,
            guildID : guildID
        }, function(err, found){
            if(found) {
                let exist = false;
				for(var j =0; j< found.members.length; j++){
					if ( username == found.members[j]) exist = true;
				}
                if(!exist){
                    found.membersName.push(message.author.username);
                    found.members.push(username);
                    found.save();
                    coutTable(message, found);
                    message.channel.send("Joined " + target + "'s schedule !").then(msg => {
                    setTimeout(() => msg.delete(), 100000)
                  });
                }
                else {
                    message.channel.send("You have joined " + target + "'s schedule !").then(msg => {
                        setTimeout(() => msg.delete(), 100000)
                      });
                }
                
            }
            else {
                message.channel.send("No event detected. Please tag a person with available schedule :)").then(msg => {
                    setTimeout(() => msg.delete(), 100000)
                  });
            }
        });


    }


}