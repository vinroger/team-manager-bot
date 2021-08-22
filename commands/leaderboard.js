const Schedule = require(process.cwd()+"/database/schedule.js");
const Guild = require(process.cwd()+"/database/profile.js");
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock } = require('@discordjs/builders');
const _ = require("lodash");
const coutTable = require(__dirname +"/coutTable.js");
const client = require(process.cwd()+"/app.js");
var findOrCreate = require('mongoose-findorcreate');
const Profile = require(process.cwd()+"/database/profile.js");


module.exports = {
    name: 'leaderboard',
    description: "show leaderboard",
    async execute(message, args){
        let username = "<@" + message.author.id + ">";
		let guildID = message.guild.id;
		let guildName = message.guild.name;
        let champions = [];
		
		await Profile.find({
			guildID : guildID,
		}, async function(err, foundItems) {
			if(foundItems){
                //console.log(foundItems);
                for(var object of foundItems){
                    
                    let personID = object.profileID;
                    let personScore = object.score;
                    let personName = await client.users.fetch(personID);
                    personName = personName.username;
                    champions.push([personScore, personName]);
                }
                  //  console.log(champions);
    
                    champions.sort(function(a,b){
                        return b[0]-a[0];
                    });
                    let rank = "```" + guildName + "'s RANK by number of games played." + "\n"+ "\n";
                    for (var i = 1; i<= Math.min(champions.length, 5); i++){
                        rank +=  i + ". " + champions[i-1][1] + " with " + champions[i-1][0] + " pts. " + "\n";
                    }
                    rank += "```"
                    message.channel.send(rank).then(msg => {
                        setTimeout(() => msg.delete(), 100000)
                      });;
                    
                
               
			}
			
			else {
				message.channel.send("No event detected. Let's team up!").then(msg => {
					setTimeout(() => msg.delete(), 100000)
				  });
			}
		});
    }
}