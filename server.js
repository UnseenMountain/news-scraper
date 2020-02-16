var express = require("express");

var exphbs = require("express-handlebars");

var cheerio = require("cherrio");

var axios = require("axios");

var app = express();

var databaseURL = "https://www.foxnews.com/";
var collections = ["scrapedData"];

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
    axios.get("https://www.foxnews.com/").then(function(response){
        var $ = cherrio.load(response.data);

        $(".article").each(function(i, element){
            var article = $(element).children("info").text();
            var link = $(element).children("a").attr("href");

            if(article && link){
                db.scrapedData.insert({
                    article: article,
                    link: link
                },
                )
            }
        })
    })
})


app.listen(3000, function() {
    console.log("app running on port 3000")
})