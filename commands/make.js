const Schedule = require(process.cwd()+"/database/schedule.js");
const Guild = require(process.cwd()+"/database/profile.js");
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock } = require('@discordjs/builders');
const _ = require("lodash");
const coutTable = require(__dirname +"/coutTable.js");
const client = require(process.cwd()+"/app.js");
var findOrCreate = require('mongoose-findorcreate');
const Profile = require(process.cwd()+"/database/profile.js");

module.exports = {
    name: 'make',
    description: "make a schedule",
    async execute(message, args){
      

		let username = "<@" + message.author.id + ">";
		let guildID = message.guild.id;
		let guildName = message.guild.name;
		let allowed = true;


		//check if the user has active event already
		await Schedule.findOne({
			creator : username,
			guildID : guildID,
		}, function(err, found){
			if(found) {
			   message.channel.send('Sorry, you only can have one event. Please '+'`#delete`' + " the previous one."  ).then(msg => {
				setTimeout(() => msg.delete(), 100000)
			  });;
			   allowed = false;
			}
		});

		if (!allowed) return;
		// filter
		const filter = function ({ author }){
			
            return message.author == author.id && allowed;
        };
        const collector = message.channel.createMessageCollector(filter, {max: 1, time : 1000});
		collector.on('collect',  async (m2) => {

			Schedule.findOne({
				creator : username,
				guildID : guildID,
			}, function(err, found){
				if(found) {
				  // message.channel.send('Sorry, you only can have one event. Please delete the previous one.');
				   allowed = false;
				}
			});
			if(!allowed) return;
			if(m2.author.id === message.author.id && allowed){
	
				let inputArr = m2.content.split(",");
				
				 
				inputArr[0] = _.startCase(_.camelCase(inputArr[0]));
				
				let gameName = _.trimStart(inputArr[0]);
				let timeName = _.trimStart(inputArr[1]);
				let descName = _.trimStart(inputArr[2]);
				Schedule.create({
					guildID : guildID,
					guildName : guildName,
					creator : username,
					creatorName : message.author.username,
					game : gameName,
					time : timeName,
					desc : descName,
					created : Date.now(),
				}, (err, createdSchedule) => {
					if(err) console.log(err);
					else {
						coutTable(message, createdSchedule);
					}
				})

				Profile.findOrCreate({profileID : message.author.id, guildID : guildID}, function(err, foundProfile){
					foundProfile.score += 20;
					foundProfile.save();
				});
			 }
			 
			 
			 
		 })
		 collector.on('end', async (collected, reason) => {
			 if (reason == "time") {
				 message.channel.send('You ran out of time!').then(msg => {
					setTimeout(() => msg.delete(), 100000)
				  });;
			 }
		 });
		if(allowed) {await message.channel.send("Give the arguments separated by commas : " + "`<game>,<time>,<description>`" + "\n" + "Example : `Valorant, 7pm later, push` ").then(msg => {
			setTimeout(() => msg.delete(), 100000)
		  });;}

	}
}
