const Schedule = require(process.cwd()+"/database/schedule.js");
const Guild = require(process.cwd()+"/database/profile.js");
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock } = require('@discordjs/builders');
const _ = require("lodash");
const coutTable = require(__dirname +"/coutTable.js");
const client = require(process.cwd()+"/app.js");
var findOrCreate = require('mongoose-findorcreate');
const Profile = require(process.cwd()+"/database/profile.js");

module.exports = {
    name: 'add',
    description: "add a member",
    async execute(message, args){

		let username = "<@" + message.author.id + ">";
		let addUser =  (message.content.slice(4)).split(",");
		let addUserName = [];
		let guildID = message.guild.id;
		let guildName = message.guild.name;

		
		
		for(var i = 0; i< addUser.length; i++){
			addUser[i] = _.trim(addUser[i]);
			addUser[i] = addUser[i].replace('!','');
			let target = addUser[i].replace('!','');
			target = target.replace('<@','');
			target = target.replace('>','');
			
			//console.log(addUser);
			try {
				let memberTemp = await client.users.fetch(target);
				addUserName.push(memberTemp.username);
			}
			catch {
				message.channel.send("Please tag a valid username. Use commas to separate players.").then(msg => {
					setTimeout(() => msg.delete(), 100000)
				});
				return;
			}
			
		}
	
		
		await Schedule.findOne({
			creator : username,
			guildID : guildID
		}, async function(err, foundItem) {
			if(foundItem) {
				let executed = false;
				for(var i = 0; i< addUser.length; i++){
					let exist = false;
					for(var j =0; j< foundItem.members.length; j++){
						if (addUser[i] == foundItem.members[j]) exist = true;
					}
					if (!exist){
						foundItem.members.push(addUser[i]);
						foundItem.membersName.push(addUserName[i]);
						let profileID = addUser[i].replace('!','').replace('<@','').replace('>','');
					
						Profile.findOrCreate({profileID : profileID, guildID : guildID}, function(err, foundProfile){
							foundProfile.score += 10;
							foundProfile.save();
							
						});
						
						if(!executed){
							executed = true;
							message.channel.send("Added!").then(msg => {
							setTimeout(() => msg.delete(), 100000)
				  			});
						}
					}
					else {
						if(!executed){
							executed = true
							message.channel.send("Added but an existed member detected. Please add other member :))").then(msg => {
							setTimeout(() => msg.delete(), 100000)
						  });
						}
					}
				}
				await foundItem.save();
				
				
				
			}
			else {
				message.channel.send("No event detected. Let's team up!").then(msg => {
					setTimeout(() => msg.delete(), 100000)
				  });
			}
			
		});
    }
}
