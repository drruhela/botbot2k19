const Discord = require('discord.js');
const fs = require('fs');
const mongo = require('mongodb').MongoClient;
const url = "mongodb+srv://botbot:rfB4tvuaMJxZal25@devcluster.wihi6.mongodb.net/commands?retryWrites=true&w=majority";
const mongoClient = new mongo(url, { useUnifiedTopology: true, useNewUrlParser: true });

const bot = new Discord.Client();
//const TOKEN = process.env.BOT_TOKEN;
const TOKEN = "Nzk0NzEyMjkwMTU4NzA2Njg5.X--zfw.5N8gNPDDJXLsHERFa6U81takVHI"

var cmds = ['alien, !alien', 'awk', 'blob, !blob', 'blobtrain, !blobtrain', 'boogie, !boogie', '!broken', '!dev', 'kappa', '!leab']

bot.login(TOKEN);

mongoClient.connect(err => {
	try {
		
	}

	finally {
    	//mongoClient.close();
  }
});

bot.on('ready', async () => {

	console.info(`Logged in as ${bot.user.tag}!`);

	await mongoClient.connect(err => {
		try {
			console.log("Connected to MongoDB!");
		}

		finally {
	    	//mongoClient.close();
	  }
	});

});


bot.on('message', message => { //commands in alphabetical order

	let messageLower = message.content.toLowerCase();
	var serverID = message.guild.id + "";
	var cmdsDB = mongoClient.db("commands");

	if (messageLower.startsWith('!addcom')) {

		var addcmd = message.content;

		var cmdArray = addcmd.split(' ');

		if (cmdArray.length <= 2) {

			message.channel.send("Add a command by typing: !addcom [commandName] [Text]");

		} else {
			
			var cmdName = cmdArray[1].toLowerCase();
			var cmdBody = "";

			for (var i = 2; i < cmdArray.length; i++) {
				cmdBody += cmdArray[i] + " ";
			}

			cmdsDB.collection("cmds").find({server : serverID, name : cmdName}).toArray(function(err, results) {
			    if (err) throw err;
			    console.log(results);

			    if (results.length == 0) {

				    var newCommand = { server: serverID, name: cmdName, text: cmdBody };
					cmdsDB.collection("cmds").insertOne(newCommand);
					message.channel.send("The command " + cmdName + " has been added to your server!");
					console.log("command doesn't exist, getting added");
				
				} else {
					console.log("command already exists");
			    	message.channel.send("That command already exists in this server. To edit it, use !edit.");
				}

		  	});

		}

	}
	
	else if (messageLower.startsWith('!delcom')) {

		var delcmd = messageLower;

		var cmdArray = delcmd.split(' ');

		if (cmdArray.length < 2) {

			message.channel.send("Delete a command by typing: !delcom [commandName]");

		} else {

			var cmdName = cmdArray[1];

			cmdsDB.collection("cmds").find({server : serverID, name : cmdName}).toArray(function(err, results) {
			    if (err) throw err;
			    console.log(results);

			    if (results.length == 0) {
				    
					message.channel.send("The command " + cmdName + " doesn't exist.");
					console.log("command doesn't exist, can't get deleted.");
				
				} else {

					var myquery = { server: serverID, name: cmdName };
				  	cmdsDB.collection("cmds").deleteOne(myquery, function(err, obj) {
					    if (err) throw err;
						console.log("command exists, getting deleted.");
				    	message.channel.send("The command " + cmdName + " has been successfully deleted.");
				    });
				}

		  	});

		}
	}


	else if (messageLower.startsWith('!editcom')) {

		var editcmd = message.content;

		var cmdArray = editcmd.split(' ');

		if (cmdArray.length <= 2) {

			message.channel.send("Edit a command by typing: !editcom [commandName] [Text]");

		} else {
			
			var cmdName = cmdArray[1].toLowerCase();
			var cmdBody = "";

			for (var i = 2; i < cmdArray.length; i++) {
				cmdBody += cmdArray[i] + " ";
			}

			cmdsDB.collection("cmds").find({server : serverID, name : cmdName}).toArray(function(err, results) {
			    if (err) throw err;
			    console.log(results);

			    if (results.length == 0) {

			    	console.log("command doesn't exist, can't edit it");
			    	message.channel.send("There is no command by the name " + cmdName + ".");

				    
				
				} else {

					var myquery = { server: serverID, name: cmdName};
					var newvalues = {$set: {text: cmdBody} };
					cmdsDB.collection("cmds").updateOne(myquery, newvalues, function(err, res) {
					 	if (err) throw err;
					    message.channel.send("The command " + cmdName + " has been edited!");
						console.log("command edited");
					});

				}

		  	});

		}

	}


	if (messageLower === '!ale') {
		message.channel.send('Pickle <:Pickle:699511064651497542>')
	}

	else if (messageLower === 'alien' || messageLower === '!alien') {
	  	
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

		var cmdsList = "";
		var title = "__**List of commands for this server: **__";

		cmdsDB.collection("cmds").find({server : serverID}).toArray(function(err, results) {
			if (err) throw err;
			//console.log(results);

			if (results.length === 0) {
				
				message.channel.send("There are no commands in this server. To add commands, use !addcom.")
				console.log("no commands in this server.")
				//cmdsList += "There are no commands in this server. To add commands, use !addcom."

			} else {

				var padlength = 40;

				for (var i = 0; i < results.length; i++) {
					cmdsList += results[i].name + ((padlength-results[i].name.length) * " ") + results[i].text + "\n";
				}

				message.channel.send(title);
				message.channel.send("```"+ cmdsList + "```");
				console.log("Commands printed");

			}
		});

		
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


	else { //read commands from database and deploy them

		//if a commmand has been used from the db, display the appopriate message

		cmdsDB.collection("cmds").find({server : serverID, name : messageLower}).toArray(function(err, results) {
			if (err) throw err;

			if (results.length != 0) {

				var cmdText = results[0].text;

				message.channel.send(cmdText);

			    console.log("Command sent successfully");

			}

		});

	}


});