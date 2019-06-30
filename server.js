// require('dotenv').config();
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
//GET route to scrape the KU website
app.get("/scrape", (req, res) => {
  axios.get("http://www2.kusports.com/news/mens_basketball/").then(response => {
    console.log("res data: " +response.data);
    const $ = cheerio.load(response.data);
    const results = []; //use {} for object

    $(".story_list div.item").each(function(i, element){
      let title = $(element).children("h4").children("a").text();
      let summary = $(element).find("p").text();
      let link = $(element).find("a").attr("href");
      //make sure article has title, summary and link before pusing
      if (title && summary && link) {
          results.push({
          title: title,
          summary: summary, 
          link: link
        });
      }
      // Create a new Article using the `result` object built from scraping
    });

    db.Article.create(results)
      .then(function(dbArticle) {
        // View the added result in the console
        console.log(dbArticle);
        res.redirect("/");
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
        res.send(err);
      });
    console.log(results);
  })
})

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Clear the DB
app.get("/clearall", function(req, res) {
  // Remove every note from the notes collection
  db.Article.remove({}, function(error, response) {
    // Log any errors to the console
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      // Otherwise, send the mongojs response to the browser
      // This will fire off the success function of the ajax request
      console.log(response);
      res.send(response);
    }
  });
});

// HTML routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/saved', (req, res) => {
  res.render('saved');
});







// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});