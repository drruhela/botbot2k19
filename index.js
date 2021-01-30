const Discord = require('discord.js');
//const csv = require('csv-parser');
const fs = require('fs');
//var json2csv = require('json2csv').parse;
//const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const bot = new Discord.Client();
//const TOKEN = process.env.BOT_TOKEN;
const TOKEN = "Nzk0NzEyMjkwMTU4NzA2Njg5.X--zfw.5N8gNPDDJXLsHERFa6U81takVHI"

var cmds = ['alien, !alien', 'awk', 'blob, !blob', 'blobtrain, !blobtrain', 'boogie, !boogie', '!broken', '!dev', 'kappa', '!leab']

bot.login(TOKEN);

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
});

/*
var newLine = '\r\n';

var fields = ['Total', 'Name'];

var appendThis = [
  {
    Total: '100',
    Name: 'myName1',
  },
  {
    Total: '200',
    Name: 'myName2',
  },
];

var toCsv = {
  data: appendThis,
  fields: fields,
  header: false,
};

fs.stat('file.csv', function (err, stat) {
  if (err == null) {
    console.log('File exists');

    //write the actual data and end with newline
    var csv = json2csv(toCsv) + newLine;

    fs.appendFile('file.csv', csv, function (err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  } else {
    //write the headers and newline
    console.log('New file, just writing headers');
    fields = fields + newLine;

    fs.writeFile('file.csv', fields, function (err) {
      if (err) throw err;
      console.log('file saved');
    });
  }
});
*/

/* write into file with csvWriter
when reading, convert from csv to array
read from array
make two methods(one that returns a boolean, one that returns the command's string)
methods will check if command exists
for addcom, return error if command exists
*/

/*
const csvWriter = createCsvWriter({
	append : true,
  path: 'commands.csv',
  header: [
    {id: 'server', title: 'Server'},
    {id: 'command', title: 'Command'},
    {id: 'body', title: 'Body'},
  ]
});

const data = [
  {
    server: 'devdev',
    command: '!hello',
    body: 'hi'
  }
];

const data2 = [
  {
    server: 'devdev2',
    command: '!hello2',
    body: 'hi2'
  }

];


csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));

csvWriter.writeRecords(data).then(()=> console.log('The CSV file was written successfully'));

csvWriter.writeRecords(data2).then(()=> console.log('The CSV file was written successfully'));

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
});*/


bot.on('message', message => { //commands in alphabetical order

	let messageLower = message.content.toLowerCase();

	

	if (messageLower.startsWith('!addcom')) {

		var addcmd = message.content;
		message.channel.send(addcmd + " " + addcmd.length);
		addcmd.split(' ');

		for (var i = 0; i < addcmd.length; i++) {
			message.channel.send(addcmd[1] + i);
		}
		if (addcmd.length < 2) {

			message.channel.send("Add a command by typing: !addcom [commandName] [Text]");

		} else {
			
			var server = message.guild.id + "";
			var cmdFilePath = "commands/" + server + ".csv";

			const csvWriter = createCsvWriter({
				append : true,
				path: cmdFilePath,
				header: [
			    {id: 'command', title: 'Command'},
			    {id: 'body', title: 'Body'},
			  ]
			});


			var cmdName = addcmd[1];
			var cmdBody = "";

			for (var i = 2; i < addcmd.length; i++) {
				cmdBody += addcmd[i] + " ";
			}

			const cmd = [{
				command : cmdName,
				body : cmdBody
			}];


			csvWriter.writeRecords(cmd).then(()=> console.log('The CSV file was written successfully'));

			message.channel.send("Command " + cmdName + " has been added to your server!")

			
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