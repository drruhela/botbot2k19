const Discord = require('discord.js');
const fs = require('fs');
const mongo = require('mongodb').MongoClient;


const mongoUserVar = process.env.mongoUser;
const mongoPassVar = process.env.mongoPass;
const dbName = "commands";

const url = "mongodb+srv://" + mongoUserVar + ":" + mongoPassVar + "@devcluster.wihi6.mongodb.net/" + dbName + "?retryWrites=true&w=majority";
const mongoClient = new mongo(url, { useUnifiedTopology: true, useNewUrlParser: true });

const bot = new Discord.Client();
//const TOKEN = process.env.BOT_TOKEN;
const TOKEN = "Nzk0NzEyMjkwMTU4NzA2Njg5.X--zfw.5N8gNPDDJXLsHERFa6U81takVHI";

//var cmds = ['alien, !alien', 'awk', 'blob, !blob', 'blobtrain, !blobtrain', 'boogie, !boogie', '!broken', '!dev', 'kappa', '!leab']

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
			    	message.channel.send("That command already exists in this server. To edit it, use !editcom.");
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

				var padlength = 30;

				for (var i = 0; i < results.length; i++) {

					var pad = "";

					for (var j = padlength; j > results[i].name.length; j--) {
						pad += " ";
					}

					var cmdCount = (i + 1) + ". ";
					cmdsList += cmdCount + results[i].name + pad + results[i].text + "\n";
				}

				message.channel.send(title);
				message.channel.send("```"+ cmdsList + "```");
				console.log("Commands printed");

			}
		});

	}

	//help command

	else if (messageLower === '!help') {

		var title = "__**Help Commands**__";

		var modCommands = [
			{'!addcom' : 'To add a new command.' },
			{'!editcom' : 'To edit an existing command.'},
			{'!delcom' : 'To delete an existing command.'}
		]

		var modCommands = [
			{
				name : '!addcom',
				text : 'To add a new command.'
			},
			{
				name : '!editcom',
				text : 'To edit an existing command.'
			},
			{
				name : '!delcom',
				text : 'To delete an existing command.'
			}
		];

		var note = "You can't delete the blobtrain or !pp commands because they're awesome :)";

		var padlength = 30;

		var cmdsList = "";

		for (var i = 0; i < modCommands.length; i++) {

			var pad = "";

			for (var j = padlength; j > modCommands[i].name.length; j--) {
				pad += " ";
			}

			var cmdCount = (i + 1) + ". ";
			cmdsList += cmdCount + modCommands[i].name + pad + modCommands[i].text + "\n";
		}

		message.channel.send(title);
		message.channel.send("```"+ cmdsList + "```");

	}


	//animated emotes

	else if (messageLower === 'blobtrain' || messageLower === '!blobtrain') {
		for (var i = 0; i < 10; i++) {
			message.channel.send('<a:blob:743847987150848080>');
		}
	}

	else if (messageLower === '!pp') {

		for (var i = 0; i < 5; i++) {
			message.channel.send('<a:ppJedi:802762707752189992> <a:ppHop:802763193972949022> <a:ppJedi:802762707752189992> <a:ppHop:802763193972949022>  <a:ppJedi:802762707752189992> <a:ppHop:802763193972949022> ');
		}
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