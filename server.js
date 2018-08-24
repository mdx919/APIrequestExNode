var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search")
})

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb"
    
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("results", { data: data });
        }
    })
})

//this part is just server stuff and default wrong route
app.get("*", function(req, res){
    res.send("Something wrong went with the route!!!")
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Port is listening....");
})