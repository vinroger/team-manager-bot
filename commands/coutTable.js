const Schedule = require(process.cwd()+"/database/schedule.js");
const Guild = require(process.cwd()+"/database/profile.js");
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock } = require('@discordjs/builders');
const _ = require("lodash");
const coutTable = require(__dirname +"/coutTable.js");
const client = require(process.cwd()+"/app.js");
var findOrCreate = require('mongoose-findorcreate');
const Profile = require(process.cwd()+"/database/profile.js");

module.exports = 
    async function(message, object){
        let string = "";
   
        // try {
            let creatorName = await client.users.fetch(object.creator.slice(2,20));
            string = 'Owner       : ' + creatorName.username+ "\n";
            
        // }
        // catch {
        //     message.channel.send("Please tag a valid username.").then(msg => {
        //         setTimeout(() => msg.delete(), 100000)
        //     });
        //     return;
        // }
    
        let string2 = `Event       : ` + `${object.game}` +  "\n" + `Time        : ` + `${object.time}` + "\n" + `Description : ` + `${object.desc}` + "\n" + `Members     : ` +"\n";
        if(object.membersName) {
            for (var i = 0; i< object.membersName.length ; i++){
                string2 += String(i+1) + ". " + object.membersName[i] + "\n";
            }	
        }
        string = `(This Message will auto-delete in 100 seconds)` + "\n" + "\n" + string + string2;
        
        string = "```" + string +"```";
        
        message.channel.send(string).then(msg => {
            setTimeout(() => msg.delete(), 100000)
          });;
    }
;