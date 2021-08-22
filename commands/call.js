const Schedule = require(process.cwd()+"/database/schedule.js");
const Guild = require(process.cwd()+"/database/profile.js");
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock } = require('@discordjs/builders');
const _ = require("lodash");
const coutTable = require(__dirname +"/coutTable.js");
const client = require(process.cwd()+"/app.js");
var findOrCreate = require('mongoose-findorcreate');
const Profile = require(process.cwd()+"/database/profile.js");


module.exports = {
    name: 'call',
    description: "delete schedule",
    async execute(message, args){
        let username = "<@" + message.author.id + ">";
		let stringTemp = "";
		let game = "";
		let guildID = message.guild.id;
		let guildName = message.guild.name;
		await Schedule.findOne({
			creator : username,
			guildID : guildID,
		}, function(err, foundItem) {
			if(foundItem){
				game = foundItem.game;
				for (var i = 0; i< foundItem.members.length; i++){
				stringTemp += foundItem.members[i];
				
				}
				message.channel.send(italic("Come join us playing " + game + " " )+ stringTemp ).then(msg => {
					setTimeout(() => msg.delete(), 100000);});
			}
			else {
				message.channel.send("No event detected. Let's team up!").then(msg => {
					setTimeout(() => msg.delete(), 100000);
				  });
			}
			
		});
    }
}