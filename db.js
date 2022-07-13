const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URI;

const dbClient = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

dbClient.connect((err) => {
	if (err) {
		console.log(err);
	}
	console.log("Connected to MongoDB");
});

module.exports = dbClient;
