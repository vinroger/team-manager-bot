const Schedule = require(process.cwd()+"/database/schedule.js");
const Guild = require(process.cwd()+"/database/profile.js");
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock } = require('@discordjs/builders');
const _ = require("lodash");
const coutTable = require(__dirname +"/coutTable.js");
const client = require(process.cwd()+"/app.js");
var findOrCreate = require('mongoose-findorcreate');
const Profile = require(process.cwd()+"/database/profile.js");


module.exports = {
    name: 'show',
    description: "show schedule",
    async execute(message, args){
		
		let username = "<@" + message.author.id + ">";
		let target = _.trimStart(message.content.slice(5));
		let guildID = message.guild.id;
		let guildName = message.guild.name;
		target = target.replace('!','');
		target = target.replace('<@','');
		target = target.replace('>','');
		
		if(target != ''){

			target = "<@" + target + ">";
			await Schedule.findOne({
				creator : target,
				guildID : guildID,
			}, function(err, found){
				if(found) {
					 coutTable(message, found);
				}
				else {
					message.channel.send("No event detected. Let's team up!").then(msg => {
						setTimeout(() => msg.delete(), 100000)
					  });
				}
			});
	
		}
		else {
			await Schedule.findOne({
				creator : username,
				guildID : guildID,
			}, function(err, found){
				if(found) {
				   coutTable(message, found);
				}
				else {
					message.channel.send("No event detected. Let's team up!").then(msg => {
						setTimeout(() => msg.delete(), 100000)
					  });
				}
			});
		}
    }
}