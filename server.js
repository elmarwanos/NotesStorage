const { MongoClient } = require("mongodb");
const express = require("express");
const url = require("url");
const ejs = require("ejs");

require('dotenv').config()

const app = new express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const connectionString = process.env.CONNECTION_STRING;

MongoClient.connect(connectionString)
    .then((client) => {
        console.log("Connected to Database");
        app.listen(3000);

        const db = client.db("notebank");
        const coins = db.collection("coins");

        app.get("/", (req, res) => {
            res.render("index.html");
        });

        app.post("/addCoin", (req, res) => {
            //TODO check if already
            coins.insertOne(req.body);
            res.redirect("/");
        });
    })
    .catch((err) => console.error("Failed to connect to Database: ", err));
