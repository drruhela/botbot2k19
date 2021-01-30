const mongoose = require('mongodb').MongoClient;
const url = "mongodb+srv://botbot:rfB4tvuaMJxZal25@devcluster.wihi6.mongodb.net/commands?retryWrites=true&w=majority";
const db = new mongoose(url, { useUnifiedTopology: true, useNewUrlParser: true });

module.exports = async () => {
	await db.connect();
	return db;
}

