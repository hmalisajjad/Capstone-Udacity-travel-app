
// Setup empty JS object to act as endpoint for all routes
projectData = {};

const dotenv = require('dotenv');
const fetch = require('node-fetch');
dotenv.config();
var path = require('path')
const mockAPIResponse = require('./mockAPI.js')
const geoUsername = process.env.geoUsername
const weatherbitKey = process.env.weatherbitKey
const pixabayKey = process.env.pixabayKey

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Dependies
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
const { url } = require('inspector');
const { response } = require('express');
app.use(express.static('dist'));

//for api key
console.log(`Your API key is ${process.env.geoUsername}`);
console.log(`Your API key is ${process.env.weatherbitKey}`);
console.log(`Your API key is ${process.env.pixabayKey}`);

// Setup Server
const port = 3000;
const server = app.listen(port, listening);

//call back
function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}


// ref: from previous evaluation app
//app.get("/", (req, res) => res.sendFile("index.html"));

const baseURL = 'http://api.geonames.org/search?q=';
const apiKey = `&username=${process.env.geoUsername}`;
const rows = '&maxRows=10';

app.get('/',function (req, res){
   // res.send(mockAPIResponse)
    res.sendFile("dist/index.html")
    //console.log(projectData)
})

//POST Route for geonames
app.post('/infoweatheradd', async (req, res) => {
    const data = req.body;
    projectData = data;
    console.log(projectData);
    //const newCity =  document.getElementById('destination').value;
    const geoNamesURL = await fetch(`${baseURL}${data.destination}${apiKey}${rows}`, {
        method: 'POST'
    })
    try {
        const newData = await geoNamesURL.json();
        projectData['longitude'] = newData.geonames[0].lng;
        projectData['latitude'] = newData.geonames[0].lat;
        projectData['name'] = newData.geonames[0].name;
        projectData['country'] = newData.geonames[0].countryName;
        projectData['code'] = geoData.geonames[0].countryCode;
        console.log(projectData)
        res.send(projectData);
    }
    catch (error) {
        console.log("error", error);
        //approximately handle the error
    }
});
//reference : https://knowledge.udacity.com/questions/560448

const weatherBit = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const bitApiKey = `&key=${process.env.weatherbitKey}`;
const imperial = '&units=I';
const language = '&lang=en';
app.get('/getWeatherbit', async (req, res) => {
    const latitude = projectData.latitude;
    const longitude = projectData.longitude;
    const weatherbitURL = `${weatherBit}lat=${latitude}&lon=${longitude}&API_KEY${bitApiKey}${language}${imperial}`;
    console.log(`Weatherbit URL is ${weatherbitURL}`);
      try {
        const result = await fetch(weatherbitURL);
          
          //failed data from API,
        if (!response.ok) {
           console.log(`Error connecting to Weatherbit API ${response.status}`);
           res.send(null);
          }
            const weatherbitData = await response.json();
            projectData['icon'] = weatherbitData.data[0].weather.icon;
            projectData['description'] = weatherbitData.data[0].weather.description;
            projectData['temperature'] = weatherbitData.data[0].temperature;
            res.send(weatherbitData);
            console.log(weatherbitData);
            // If error to connection to API
        } catch (error) {
            console.log(`Error connecting to server: ${error}`);
            res.send(null);
     }
  })


//POST Route for pixabay
const pixabay = 'https://pixabay.com/api/';
const pixabayApiKey = `?key=${process.env.pixabayKey}`;
const type = '&image_type=photo&orientation=horizontal&safesearch=true&per_page=100';

app.get('/getPixabay', async (req, res) => {
    console.log(`Pixabay: ${projectData.name}`);
    const destination = projectData.name;
    let pixabayURL = `${pixabay}${pixabayApiKey}${destination}${type}`;
    console.log(`Pixabay URL is ${pixabayURL}`);
      try {
        let response = await fetch(pixabayURL);
        // failed datafrom API
          if (!response.ok) {
              console.log(`Error connecting to Pixabay API ${response.status}`);
              res.send(null);
          }
        let pixData = await response.json();
        projectData['image1'] = pixData.hits[0].webformatURL;
        projectData['image2'] = pixData.hits[1].webformatURL;
        projectData['image3'] = pixData.hits[2].webformatURL;
        res.send(pixData);
        console.log(image1, image2, image3);
        image1, image2, image3 = projectData;
  
        // If no photo was returned for city, get one for the country instead
        if (responseJSON.total == 0) {
         const country = projectData.countryName;
         console.log(`No photo for ${destination}. Looking for ${country}.`);
         pixabayURL = `${pixabay}${country}${pixabayApiKey}${type}`;
         console.log(`Pixabay country URL is ${pixabayURL}`);
          response = await fetch(pixabayURL)
            // failed data from API
            if (!response.ok) {
                console.log(`Error connecting to Pixabay ${responsestatus}`)
                res.send(null)
            }
            responseJSON = await response.json()
        }
  
        res.send(responseJSON)
        // If failed connection to API, return null
    } catch (error) {
        console.log(`Error connecting to server: ${error}`)
        res.send(null)
    }
  })

app.get('/getData', (req, res) => {
    console.log(projectData);
    res.send(projectData);
    res.json({message: 'Data is successfully recieved'});
})

//export {getData,getPixabay,getWeatherbit,infoweatheradd }