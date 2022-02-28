const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the CITY from the html form, display in // console.
        var cityName = req.body.cityInput;
        console.log(req.body.cityInput);
    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "feac5a4b6ea4734593fb1442b704df05";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +  "&units=" + units + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + 
            "@2x.png";
            const humidity = weatherData.main.humidity;
            const wind = weatherData.wind.speed;
            
            // displays the output of the results
            res.write("<h1> The weather is " + weatherDescription +"<h1>");
            res.write("<h2> The temperature in " + city + " is " + temp + " Degrees Fahrenheit.<h2>"); 
            res.write("<h3>The humdity is " + humidity + "% and the wind speed is " + wind +" MPH.<h3>")
            res.write("<br>");
            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
