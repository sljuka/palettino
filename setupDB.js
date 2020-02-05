// newdb is the new database we create
const url = "mongodb://localhost:27017/palettino";

// create a client to mongodb
const MongoClient = require("mongodb").MongoClient;

// make client connect to mongo service
MongoClient.connect(url, async (err, db) => {
  if (err) throw err;
  await db.db("palettino").createCollection("palettes");
  console.log("Database created!");
  db.close();
});
