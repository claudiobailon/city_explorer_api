'use strict';

// bring in libraries
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
// define PORT as the port value in our .env. if anything is wrong with our .env or dotenv, assign port 3001
const PORT = process.env.PORT || 3001;

const errObj = {
  status: 500,
  responseText: 'Sorry, something went wrong',
}

app.get('/location', (request, response) => {
  let city = request.query.city;
  let cityData = require('./data/location.json');
  try {

    const object = new Location(city, cityData[0]);
    response.send(object);
  } catch (error) {
    console.log('ERROR', error);
    response.status(errObj.status).send(errObj.responseText);
  }
})

app.get('/weather', (request, response) => {
  let weather = require('./data/weather.json');
  console.log(request.query.search_query);

  const weatherArray = [];

  weather.data.forEach(value => {
    weatherArray.push(new Weather(value));
  })
  response.send(weatherArray);

})
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})

function Location(query, obj) {
  this.search_query = query;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

function Weather(obj) {
  this.forecast = obj.weather.description;
  this.time = obj.valid_date;
}
