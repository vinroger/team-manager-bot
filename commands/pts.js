const Schedule = require(process.cwd()+"/database/schedule.js");
const Guild = require(process.cwd()+"/database/profile.js");
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock } = require('@discordjs/builders');
const _ = require("lodash");
const coutTable = require(__dirname +"/coutTable.js");
const client = require(process.cwd()+"/app.js");
var findOrCreate = require('mongoose-findorcreate');
const Profile = require(process.cwd()+"/database/profile.js");


module.exports = {
    name: 'pts',
    description: "display points",
    async execute(message, args){
        let username = "<@" + message.author.id + ">";
		let guildID = message.guild.id;
		let guildName = message.guild.name;

        let target = _.trimStart(message.content.slice(4));
		target = target.replace('!','');
		target = target.replace('<@','');
		target = target.replace('>','');
		
        if(target == ''){
            await Profile.findOrCreate({profileID : message.author.id}, function(err, foundProfile){
                message.channel.send(message.author.username + "'s points is " + foundProfile.score + " pts!");
            });
        }
        else {
            let creatorName = await client.users.fetch(target);

            await Profile.findOrCreate({profileID : target}, function(err, foundProfile){

                message.channel.send(creatorName.username + "'s points is " + foundProfile.score + " pts!");
            });
        }
		
    }
}