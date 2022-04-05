const request = require('postman-request')

const weatherInfo = (location, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e023ad54b8e737f4d6c6e0ccb215b2f1&query=${location}`

  request({url, json: true}, (err, res, {location, current, error}) => {
    if(err){
      callback('Unable to connect to weather service!', undefined)
    }
    else if(error) {
      callback(`Unable to find location!`, undefined)
    }
    else{
      callback(undefined, 
        {
          forecast: `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees outside. It feels like ${current.feelslike} degrees.`,
          location: `${location.name}, ${location.region}, ${location.country}`
        })
    }
  })
}

module.exports = weatherInfo