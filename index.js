const Discord = require('discord.js');
const fs = require('fs');
var mongo = require('mongodb');

const bot = new Discord.Client();
//const TOKEN = process.env.BOT_TOKEN;
const TOKEN = "Nzk0NzEyMjkwMTU4NzA2Njg5.X--zfw.5N8gNPDDJXLsHERFa6U81takVHI"

var cmds = ['alien, !alien', 'awk', 'blob, !blob', 'blobtrain, !blobtrain', 'boogie, !boogie', '!broken', '!dev', 'kappa', '!leab']

bot.login(TOKEN);

//database name: commands
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://botbot:rfB4tvuaMJxZal25@devcluster.wihi6.mongodb.net/commands?retryWrites=true&w=majority";
const db = new MongoClient(uri, { useNewUrlParser: true });
//collections: servers, cmds

/*
db.connect(err => {
	var cmdDB = db.db("commands");
	
	cmdDB.createCollection("cmds", function(err, res) {
	    if (err) throw err;
	    console.log("Collection Cmds created!");
	    db.close();
	});

	
});
*/
/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
*/

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
});


bot.on('message', message => { //commands in alphabetical order

	let messageLower = message.content.toLowerCase();


	if (messageLower.startsWith('!addcom')) {

		var addcmd = message.content;
		message.channel.send("message: " + addcmd);

		var cmdArray = addcmd.split(' ');
		message.channel.send(cmdArray.length);

		
		for (var i = 0; i < cmdArray.length; i++) {
			message.channel.send(addcmd[1] + " " + i);
		}

		if (cmdArray.length < 2) {

			message.channel.send("Add a command by typing: !addcom [commandName] [Text]");

		} else {
			
			var serverID = message.guild.id + "";
			var cmdName = cmdArray[1];
			var cmdBody = "";

			for (var i = 2; i < cmdArray.length; i++) {
				cmdBody += cmdArray[i] + " ";
			}

			
			db.connect(err => {
				if (err) throw err;
				var cmdsDB = db.db("commands");
			 	var newCommand = { server: serverID, name: cmdName, text: cmdBody };
			  	cmdsDB.collection("cmds").insertOne(newCommand, function(err, res) {
				    if (err) throw err;
				    console.log(cmdName + " added to commands database. Server: " + serverID + " Text: " + cmdBody);
				    db.close();
			  	});
			});

			message.channel.send("The command " + cmdName + " has been added to your server!");

		}

	}
	

	if (messageLower === '!ale') {
		message.channel.send('Pickle <:Pickle:699511064651497542>')
	}

	if (messageLower === 'alien' || messageLower === '!alien') {
	  	
	    message.channel.send('<a:alienpls:801563358997512232>');

	}

	else if (messageLower === 'awk') {

		message.channel.send('<:awk:801684378353664061>');
	}

	else if (messageLower === 'blob' || messageLower === '!blob') {
	  	
	    message.channel.send('<a:blob:743847987150848080>');

	}

	else if (messageLower === 'blobtrain' || messageLower === '!blobtrain') {
		for (var i = 0; i < 10; i++) {
			message.channel.send('<a:blob:743847987150848080>');
		}
	}

	else if (messageLower === 'boogie' || messageLower === '!boogie') {
	  	
	    message.channel.send('<a:boogie:799348432962846720>');

	}

	else if (messageLower === '!broken') {
		message.channel.send('heart :heart: been broke :broken_heart: so many times :alarm_clock: i i don’t :woman_shrugging: know what to believe :thought_balloon: yeah :thumbsup: mama :woman: said it’s my fault :thumbsdown:');
	}

	else if (messageLower === '!cmds') {

		var cmdsList = '';
		var title = '__**List of commands for botbot2k19: **__';

		for (var i = 0; i < cmds.length; i++) {
			cmdsList += cmds[i] + '\n'
		}
		message.channel.send(title);
		message.channel.send('```'+ cmdsList + '```');
	}

	else if (messageLower === '!dev') {

		message.channel.send('the most awesoem person to ever live on this planet <:hypers:801579010668757042> <:Kappa:743846227619217523>');

	}

	else if (messageLower === '!drew') {
		message.channel.send('Sister Drew :heart:')
	}

	else if(messageLower === '!freq' || messageLower === '!john') {
		message.channel.send('Best mod worldwide <:hypers:801579010668757042>')
	}

	else if (messageLower === '!imaani') {
		message.channel.send("Dev's Everything <:love:746027756525060199>");
	}

	else if (messageLower === 'kappa') {
		message.channel.send('<:kappa:743846227619217523>');
	}

	else if (messageLower === 'leab' || messageLower === '!leab') {
		message.channel.send('gtfo');
	}

	else if (messageLower === '!popo') {
		message.channel.send("Smarb but stoopid <:p_:763179797110849557> <:love:746027756525060199>");
	}

	else if (messageLower === '!pp') {

		for (var i = 0; i < 5; i++) {
			message.channel.send('<a:ppJedi:802762707752189992> <a:ppHop:802763193972949022> ');
		}
	}

	else if (messageLower === 'pphop' || messageLower === '!pphop') {
		message.channel.send('<a:ppHop:802763193972949022>');
	}

	else if (messageLower === 'ppjedi' || messageLower === '!ppjedi') {
		message.channel.send('<a:ppJedi:802762707752189992>');
	}

	else if (messageLower === '!queen') {
		message.channel.send('Brother Queen <:CarlSmile:775435711876300861>');
	}

	else if (messageLower === '!vinny') {
		message.channel.send('<:botalert:802769299072614460> <:p_:763179797110849557>')
	}

});