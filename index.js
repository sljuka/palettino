const express = require("express");
const bodyParser = require("body-parser");
const mongo = require("./database");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/paletts", async (req, res) => {
  try {
    const { palette, name } = req.body;

    if (!name || name === "")
      return res.status(400).send({ error: "Name required" });

    const doc = await mongo.client
      .db("palettino")
      .collection("palettes")
      .findOne({ name });

    if (doc) {
      await mongo.client
        .db("palettino")
        .collection("palettes")
        .replaceOne({ id: doc.id }, { name, palette });
    } else {
      await mongo.client
        .db("palettino")
        .collection("palettes")
        .insertOne({ palette, name });
    }
    res.status(200).send({ status: "ok" });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Unknown error" });
  }
});

app.get("/palette/:name", async (req, res) => {
  try {
    const doc = await mongo.client
      .db("palettino")
      .collection("palettes")
      .findOne({ name: req.params.name });
    if (!doc) return res.status(400).send({ error: "palette not found" });

    res.send(doc);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Unknown error" });
  }
});

const start = async () => {
  await mongo.main();
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

start();
