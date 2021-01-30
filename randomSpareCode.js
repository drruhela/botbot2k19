//csvWriter stuff

/*
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

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


/*
var cmdFilePath = "commands/" + server + ".csv";

			const csvWriter = createCsvWriter({
				append : true,
				path: cmdFilePath,
				header: [
			    {id: 'command', title: 'Command'},
			    {id: 'body', title: 'Body'},
			  ]
			});
			

			const cmd = [{
				command : cmdName,
				body : cmdBody
			}];


			csvWriter.writeRecords(cmd).then(()=> console.log('The CSV file was written successfully'));

			message.channel.send("Command " + cmdName + " has been added to your server!")
*/



//==================================================
//MONGO CODE

//database name: commands
//const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://botbot:rfB4tvuaMJxZal25@devcluster.wihi6.mongodb.net/commands?retryWrites=true&w=majority";
//const db = new MongoClient(uri, { useNewUrlParser: true });
//collections: servers, cmds

/*
db.connect(err => {
	if (err) throw err;
  var dbo = db.db("commands");
  var myquery = { name: 'broken' };
  dbo.collection("cmds").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("dev deleted");
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

/*
db.connect(err => {
  if (err) throw err;
  var dbo = db.db("commands");
  dbo.collection("cmds").find({name : 'broken'}, { projection: { _id: 1, server: 1, name: 1, text: 1 } }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result[0].text);
    db.close();
  });
});
*/



			/*
			if (cmdsDB.collection("cmds").countDocuments({name: cmdName}) > 0) {
				console.log("command already exists");
		    	message.channel.send("That command already exists in this server. To edit it, use !edit.");
			} else {
				var newCommand = { server: serverID, name: cmdName, text: cmdBody };
				cmdsDB.collection("cmds").insertOne(newCommand);
				message.channel.send("The command " + cmdName + " has been added to your server!");
				console.log("command doesn't exist, getting added");
			}*/

			/*
			cmdsDB.collection("cmds").find( {server : serverID, name : cmdName}, function (err, results) {
				if (err) throw err;
				console.log(results.length);

			    if (results.length == 0) {

				    var newCommand = { server: serverID, name: cmdName, text: cmdBody };
					cmdsDB.collection("cmds").insertOne(newCommand);
					message.channel.send("The command " + cmdName + " has been added to your server!");
					console.log("command doesn't exist, getting added");
				
				} else {
					console.log("command already exists");
			    	message.channel.send("That command already exists in this server. To edit it, use !edit.");
				}
			});*/


/*
			
			db.connect(err => {
				if (err) throw err;
				var cmdsDB = db.db("commands");

				if (cmdsDB.collection("cmds").countDocuments({server : serverID, name: cmdName}) > 0) {
					console.log("command already exists");
			    	message.channel.send("That command already exists in this server. To edit it, use !edit.");
				} else {
					console.log("command doesn't exist");
					
					//make command
					var newCommand = { server: serverID, name: cmdName, text: cmdBody };

					message.channel.send("The command " + cmdName + " has been added to your server!");
					cmdsDB.collection("cmds").insertOne(newCommand);
					console.log(cmdName + " added to commands database. Server: " + serverID + " Text: " + cmdBody);
					
				}
				//comment the rest of this out
			 	cmdsDB.collection("cmds").find({server : serverID, name : cmdName}).toArray(function(err, result) {
			    	//if (err) throw err;

			    	var exists = false;

			    	if (result.length > 0) {
			    		
			    		for (var i = 0; i <= result.length; i++) {
			    			console.log(result);
			    			if (result[i].name == cmdName) {
			    				exists = true;
			    			} 
			    		}
			    	}

			    	if ( exists === true) {

			    		console.log("command already exists");
			    		message.channel.send("That command already exists in this server. To edit it, use !edit.");

			    	} else {
			    		console.log("command doesn't exist yet");

			    		//comment this out
					 	var newCommand = { server: serverID, name: cmdName, text: cmdBody };
					  	cmdsDB.collection("cmds").insertOne(newCommand, function(err, res) {
							//if (err) throw err;
						    console.log(cmdName + " added to commands database. Server: " + serverID + " Text: " + cmdBody);
						    db.close();
					  	})

			    	}

			    	db.close();
				});

				db.close();
			 	
			});

			*/



/* Commands 

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

*/