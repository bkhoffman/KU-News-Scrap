require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const exphbs = require('express-handlebars');

//require models
const db = require("./models");

const PORT = 3000 || process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//initialize express
const app = express();

// Use morgan logger for loggin requests
app.use(logger("dev"));
//Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

//Connect to the mongo db
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//Routes

app.get("/scrape", (req, res) => {
  axios.get("http://www2.kusports.com/news/mens_basketball/").then(response => {
    const $ = cherrio.load(response.data);
  })
})









// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});