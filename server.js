const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

var db, collection;

// const url = "mongodb+srv://demo:demo@cluster0-q2ojb.mongodb.net/test?retryWrites=true"; //const url = variable and link to your db username and password

const url =
  "mongodb+srv://mawong2:eVUa3qBDYCkoNjyi@cluster0.3xblz.mongodb.net/?retryWrites=true&w=majority";
const dbName = "parentLove";

app.listen(3000, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
    }
  );
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("parentLoveMessages")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render("index.ejs", { loveData: result });
    });
});

app.post("/parentLoveMessages", (req, res) => {
  db.collection("parentLoveMessages").insertOne(
    { name: req.body.name, msg: req.body.msg, heart: 0, cry: 0 },
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});

app.put("/parentLoveMessages", (req, res) => {
  console.log(req.body);
  db.collection("parentLoveMessages").findOneAndUpdate(
    { name: req.body.name, msg: req.body.msg },
    {
      $set: {
        heart: req.body.heart + 1,
      },
    },
    {
      sort: { _id: -1 },
      upsert: true,
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

app.put("/parentLoveMessagesDown", (req, res) => {
  db.collection("parentLoveMessages").findOneAndUpdate(
    { name: req.body.name, msg: req.body.msg },
    {
      $set: {
        cry: req.body.sadCry - 1,
      },
    },
    {
      sort: { _id: -1 },
      upsert: true,
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

app.delete("/parentLoveDelete", (req, res) => {
  db.collection("parentLoveMessages").findOneAndDelete(
    { name: req.body.name, msg: req.body.msg },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Message deleted!");
    }
  );
});
