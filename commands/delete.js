const Schedule = require(process.cwd()+"/database/schedule.js");
const Guild = require(process.cwd()+"/database/profile.js");
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock } = require('@discordjs/builders');
const _ = require("lodash");
const coutTable = require(__dirname +"/coutTable.js");
const client = require(process.cwd()+"/app.js");
var findOrCreate = require('mongoose-findorcreate');
const Profile = require(process.cwd()+"/database/profile.js");

module.exports = {
    name: 'delete',
    description: "delete schedule",
    async execute(message, args){
        let username = "<@" + message.author.id + ">";
		let guildID = message.guild.id;
		let guildName = message.guild.name;
		await message.channel.send("Deleted!").then(msg => {
			setTimeout(() => msg.delete(), 100000)
		  });
		await Schedule.deleteOne({
			creator : username,
			guildID : guildID,
		}, function(err){
			if(err) console.log(err);
		});
    }
}