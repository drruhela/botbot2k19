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

bot.on("guildCreate", guild => {
   guild.owner.send('Thanks for the invite! You can use b!help to find the commands.')
});

bot.on('ready', async () => {

	console.info(`Logged in as ${bot.user.tag}!`);

    bot.user.setActivity("b!help"); 

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
		
		var divisions = [];
		var divisionLength = 0;

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

					divisionLength += cmdCount.length + results[i].name.length + pad.length + results[i].text.length;

					if (divisionLength < 1800) {

						cmdsList += cmdCount + results[i].name + pad + results[i].text + "\n";

					} else {
						divisions.push(cmdsList);
						cmdsList = "";
						divisionLength = 0;
					}
					
				}

				message.channel.send(title);

				for (var i = 0; i < divisions.length; i++) {
					message.channel.send("```"+ divisions[i] + "```");
				}

				//message.channel.send("```"+ cmdsList + "```");
				console.log("Commands printed");

			}
		});

	}

	//help command

	else if (messageLower === 'b!help') {

		var title = "__**Help Commands**__";

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
			},
			{
				name : '!cmds',
				text : 'List of current commands.'
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

	//naruto answers
	else if (messageLower.startsWith('-aq')) {

		var addq = message.content;

		//var qArray = addcmd.split(' ');

		if (addq.length <= 6 || addq.indexOf('?') == -1) {

			message.channel.send("Add a question by typing: -aq [question?] [answer]");

		} else {
			
			var qEnds = messageLower.indexOf('?');
			var question = messageLower.substring(4,qEnds+1);
			var answer = addq.substring(qEnds+1);

			cmdsDB.collection("questions").find({server : serverID, name : question}).toArray(function(err, results) {
			    if (err) throw err;
			    console.log(results);

			    if (results.length == 0) {

				    var newCommand = { server: serverID, name: question, text: answer };
					cmdsDB.collection("questions").insertOne(newCommand);
					message.channel.send("The question " + question + " has been added to your server!");
					console.log("question doesn't exist, getting added");
				
				} else {
					console.log("question already exists");
			    	message.channel.send("That question has already been added. To edit it, use -eq.");
				}

		  	});

		}

	}

	else if (messageLower.startsWith('-eq')) {

		var editq = message.content;

		if (editq.length <= 6 || editq.indexOf('?') == -1) {

			message.channel.send("Edit a question by typing: -eq [question?] [answer]");

		} else {
			
			var qEnds = messageLower.indexOf('?');
			var question = messageLower.substring(4,qEnds+1);
			var answer = editq.substring(qEnds+1);

			cmdsDB.collection("questions").find({server : serverID, name : question}).toArray(function(err, results) {
			    if (err) throw err;
			    console.log(results);

			    if (results.length == 0) {

			    	console.log("question doesn't exist, can't edit it");
			    	message.channel.send("The question " + question + " couldn't be found.");
				
				} else {

					var myquery = { server: serverID, name: question};
					var newvalues = {$set: {text: answer} };
					cmdsDB.collection("questions").updateOne(myquery, newvalues, function(err, res) {
					 	if (err) throw err;
					    message.channel.send("The question " + question + " has been edited!");
						console.log("question edited");
					});

				}

		  	});

		}

	}

	else if (messageLower.startsWith('-dq')) {

		var deleteq = messageLower;

		if (deleteq.length <= 5) {

			message.channel.send("Delete a question by typing: -dq [question?]");

		} else {

			var question = deleteq.substring(4);

			cmdsDB.collection("questions").find({server : serverID, name : question}).toArray(function(err, results) {
			    if (err) throw err;
			    console.log(results);

			    if (results.length == 0) {
				    
					message.channel.send("The question " + question + " couldn't be found.");
					console.log("question doesn't exist, can't get deleted.");
				
				} else {

					var myquery = { server: serverID, name: question };
				  	cmdsDB.collection("questions").deleteOne(myquery, function(err, obj) {
					    if (err) throw err;
						console.log("question exists, getting deleted.");
				    	message.channel.send("The question " + question + " has been successfully deleted.");
				    });
				}

		  	});

		}
	}

	else if (messageLower === '-questions') {

		var cmdsList = "";
		var title = "__**Questions:**__";

		var divisions = [];
		var divisionLength = 0;

		cmdsDB.collection("questions").find({server : serverID}).toArray(function(err, results) {
			if (err) throw err;
			//console.log(results);

			if (results.length === 0) {
				
				message.channel.send("There are no questions in this server. To add questions, use -aq.")
				console.log("no questions in this server.")
				//cmdsList += "There are no commands in this server. To add commands, use !addcom."

			} else {

				var padlength = 20;

				for (var i = 0; i < results.length; i++) {

					var pad = "";

					for (var j = padlength; j > results[i].name.length; j--) {
						pad += " ";
					}

					var cmdCount = (i + 1) + ". ";

					divisionLength += cmdCount.length + results[i].name.length + pad.length + results[i].text.length;

					if (divisionLength <= 1800) {

						cmdsList += cmdCount + results[i].name + pad + results[i].text + "\n";

					} else {
						divisions.push(cmdsList);
						cmdsList = "";
						divisionLength = 0;
					}
				}

				message.channel.send(title);

				for (var i = 0; i < divisions.length; i++) {
					message.channel.send("```"+ divisions[i] + "```");
				}

				//message.channel.send("```"+ cmdsList + "```");

				console.log("Questions printed");

			}
		});

		/*
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Questions')
			.setDescription('Questions and Answers')
			.setThumbnail('https://i.imgur.com/wSTFkRM.png')
			.addFields(
				{ name: 'Regular field title', value: 'Some value here' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
			)
			.addField('Inline field title', 'Some value here', true)
			.setImage('https://i.imgur.com/wSTFkRM.png')
			.setTimestamp()
			.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

		channel.send(exampleEmbed);*/

	}

	//vanish command - deletes last message sent by user that does !vanish
	else if (messageLower === '!vanish') {
		var mAuthor = message.author;
		var i = 0;
		while (i < 2) {
			message.channel.messages.fetch({ limit: 1 }).then(messages => {
				let vanishMessage = messages.first();
				console.log(vanishMessage.content);
				vanishMessage.delete();
				console.log("!vanish deleted.")
				
			})
			.catch(console.error);
		}
		/*
		message.channel.messages.fetch({ limit : 1}).then(messages => {
			let lastMessage = messages.first();
			
			if(lastMessage.author === mAuthor) {
				console.log(lastMessage.content);
				lastMessage.delete();
				console.log("last message deleted.")
			} else {
				console.log("Last message was not sent by same author.")
			}

		})
		.catch(console.error);*/
	}

	else { //read commands from database and deploy them

		//if a commmand has been used from the db, display the appopriate message

		cmdsDB.collection("cmds").find({server : serverID, name : messageLower}).toArray(function(err, results) {
			if (err) throw err;

			if (results.length != 0) {

				var cmdText = results[0].text;

				if(cmdText.startsWith("/tts ") && cmdText.length >= 5) {
					/*var cmdArray = cmdText.split(' ');
					var ttsText = "";

					for (var i = 2; i < cmdArray.length; i++) {
						ttsText += cmdArray[i] + " ";
					}

					message.channel.send(ttsText, {
						tts: true
					});*/
					
					var ttsText = cmdText.substring(5);
					message.channel.send(ttsText, { tts: true });

				}
				
				else {
					message.channel.send(cmdText);
				}

			    console.log("Command sent successfully");

			}

		});

		cmdsDB.collection("questions").find({server : serverID, name : messageLower}).toArray(function(err, results) {
			if (err) throw err;

			if (results.length != 0) {

				var cmdText = results[0].text;

				if(cmdText.startsWith("/tts ") && cmdText.length >= 5) {
					/*var cmdArray = cmdText.split(' ');
					var ttsText = "";

					for (var i = 2; i < cmdArray.length; i++) {
						ttsText += cmdArray[i] + " ";
					}

					message.channel.send(ttsText, {
						tts: true
					});*/
					
					var ttsText = cmdText.substring(5);
					message.channel.send(ttsText, { tts: true });

				}
				
				else {
					message.channel.send(cmdText);
				}

			    console.log("Command sent successfully");

			}

		});

	}


});