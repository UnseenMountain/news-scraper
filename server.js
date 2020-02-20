var express = require("express");

var exphbs = require("express-handlebars");

var cheerio = require("cherrio");

var axios = require("axios");

//loads Express
var app = express();



var databaseURL = "scraper";
var collections = ["scrapedData"];

app.use(express.static("public"));

app.use(express.urlnencoded({ extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./controllers/newsController.js");

// Hook mongojs configuration to the db variable
var db = mongojs(databaseURL, collections);
db.on("error",  function(error){
    console.log("Database error", error);
});

app.get("/", function(req, res){
    res.send("Hello World")
});

app.get("/all", function(req, res){
    db.scrpedData.find({}, function(error, found){
        if (error) {
            console.log(error);
        }else{
            res.json(found);
        }
    });
});

app.get("/scrape", function(req, res){
    axios.get("https://www.pcgamer.com/news/").then(function(response){
         // Load the html body from axios into cheerio
        var $ = cherrio.load(response.data);

        $(".title").each(function(i, element) {
            // Save the text and href of each link enclosed in the current element
            var headLine = $(element).children("h3").text();
            var summery = $(element).children("p").text();
            // var link = $(element).children("a").attr("href");
            var link = "https://www.pcgamer.com/news/" + $(element).find("a").attr("href");

            if (title && link) {
                // Insert the data in the scrapedData db
                db.scrapedData.insert({
                 headLine: headLine,
                 summery: summery,
                  link: link
                },
                function (err, inserted) {
                    if (err){
                        console.log(err);
                    }else{
                        console.log(inserted);
                    }
                })
            }
        })
    })

    res.send("Scrape Complete");
})


app.listen(3000, function() {
    console.log("app running on port 3000")
})
