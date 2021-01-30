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