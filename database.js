const { MongoClient } = require("mongodb");

class Mongo {
  constructor() {
    this.client = new MongoClient("mongodb://127.0.0.1:27017/palettino", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async main() {
    await this.client.connect();
    console.log("Connected to MongoDB");

    this.db = this.client.db();
  }
}

module.exports = new Mongo();
