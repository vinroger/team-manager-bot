const Schedule = require(process.cwd()+"/database/schedule.js");
const Guild = require(process.cwd()+"/database/profile.js");
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock } = require('@discordjs/builders');
const _ = require("lodash");
const coutTable = require(__dirname +"/coutTable.js");
const client = require(process.cwd()+"/app.js");
var findOrCreate = require('mongoose-findorcreate');
const Profile = require(process.cwd()+"/database/profile.js");



module.exports = {
    name: 'transfer',
    description: "transfer ownership",
    async execute(message, args){
    
		let username = "<@" + message.author.id + ">";
        let sliced = message.content.slice(9);
        let target = _.trimEnd(_.trimStart(sliced));
		let guildID = message.guild.id;
		let guildName = message.guild.name;
		
        target = target.replace('!','');
		
		await Schedule.findOne({
			creator : target,
			guildID : guildID,
		}, async function(err, found){
			if(found) {
			   message.channel.send('Sorry, ' + target + '  only can have one event. Please request '+'`$delete`' + " the previous one."  ).then(msg => {
				setTimeout(() => msg.delete(), 100000)
			  });;
			}
			else {
				await Schedule.findOne({
					creator : username,
					guildID : guildID,
				}, async function(err, found){
					if(found) {
						found.creator = target;
						targetName =  await client.users.fetch(target.slice(2,20));
						
						found.creatorName = targetName.username;
						found.save();
						coutTable(message, found);
					}
					else {
						message.channel.send("No event detected. Let's team up!").then(msg => {
							setTimeout(() => msg.delete(), 100000)
						});
					}
				});
			}
		});
		
		
		
		
    }
}