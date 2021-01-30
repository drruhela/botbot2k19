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