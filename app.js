// jshint: esversion6
const mongoose = require("mongoose");
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock } = require('@discordjs/builders');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
module.exports = client;
client.commands = new Discord.Collection();

//env and filesystem
require('dotenv').config();
const fs = require('fs');
const _ = require("lodash");

//mongodb init
let db1 = process.env.DB1;
mongoose.connect(db1, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);


//Schema
const Schedule = require(__dirname +"/database/schedule.js");

//Reading through command files
const commandFiles = fs.readdirSync(__dirname +'/commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(__dirname +`/commands/${file}`);
    client.commands.set(command.name, command);
}

//Bot is ready
client.once('ready', () => {
	console.log('Bot is Ready!');
});

//Prefix
const prefix = '$';




//on message
client.on('messageCreate', async message =>{

	//show GUIDE/ HELP for users
	if(message.content === "<@!877212929504722975>"|| message.content === "<@877212929504722975>" || message.content === "$help"  ) {
		let help = "Hii, I'm here to help you :)" + "\n" ;
		help += "`$make                               `" +" -> " + "` to create new schedule for your team.`" + "\n";
		help += "`$add <tag-a-person>, <tag-a-person> `" + " -> " +"` to add members. `"  + "\n";
		help += "`$show                               `" + " -> " +"` to preview your schedule (auto-delete in 100s). `"  + "\n";
		help += "`$showhold                           `" + " -> " +"` to preview your schedule without dissapearing. `"  + "\n";
		help += "`$show <tag-a-person>                `" + " -> " +"` to show your friends' schedule. `"  + "\n";
		help += "`$call                               `" + " -> " +"` to call all the members. `" + "\n";
		help += "`$transfer <tag-a-person>            `" + " -> " +"` to transfer ownership of your schedule.`"  + "\n";
		help += "`$reset                              `" + " -> " +"` to reset all the members. `"  + "\n";
		help += "`$delete                             `" + " -> " +"` to delete when you're done! `"  + "\n";
		help += "`$join <tag-a-person/schedule>       `" + " -> " +"` to join another schedule! `"  + "\n";
		help += "`$rank                               `" + " -> " +"` to display server leaderboard! `"  + "\n";
		help += "`$pts                                `" + " -> " +"` to display your points `"  + "\n";
		help += "`$pts <tag-a-person>                 `" + " -> " +"` to display your friend's points `"  + "\n";
		
		
		

		message.channel.send (help).then(msg => {
			setTimeout(() => msg.delete(), 100000)
		  });
	}
	let msgContent = message.content;
	let trimmedMsg = msgContent.split(' ').join('');
	if (trimmedMsg === "ily<@!877212929504722975>" || trimmedMsg === "ily<@877212929504722975>" ){
		message.channel.send("I love you too! :heart:");
	}
	
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
	const guildID = message.guild.id;
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

	//Command for TeamManager
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
	if (command === "show"){
		client.commands.get('show').execute(message, args);
	} 
	if (command === "delete"){
		client.commands.get('delete').execute(message, args);
	}
	if (command === "make"){
		client.commands.get('make').execute(message, args);
	}	
	if (command === "add") {
		client.commands.get('add').execute(message, args);
	}
	if (command === "reset") {
		client.commands.get('reset').execute(message, args);
	}
	if (command === "call"){
		client.commands.get('call').execute(message, args);
	}
	if (command === "join"){
		client.commands.get('join').execute(message, args);
	}
	if (command === "showhold"){
		client.commands.get('showhold').execute(message, args);
	}
	if (command === "transfer"){
		client.commands.get('transfer').execute(message, args);
	}
	if (command === "rank"){
		client.commands.get('leaderboard').execute(message, args);
	}
	if (command === "pts"){
		client.commands.get('pts').execute(message, args);
	}
	if (command === "ily"){
		message.channel.send("I love you too! :heart:");
	}
	if (command === "remove"){
		client.commands.get('remove').execute(message, args);
	}
	


	
});




client.login(process.env.TOKEN);
