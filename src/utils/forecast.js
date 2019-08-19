const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url ='https://api.darksky.net/forecast/5fd4b6dad4755afcd37f55aa5d8b5726/'+latitude+','+longitude
    request({ url, json: true }, (error, {body}) => {
    
        if (error) {
            callback('ERROR: Unable to connect to weather service!')
        } else if (body.error) {
            callback('ERROR: Unable to find location')
        } else {
            callback(undefined, 
                body.daily.data[0].summary + ' It is currently ' +
                body.currently.temperature + ' degress out. There is a ' +
                body.currently.precipProbability*100 + '% chance of rain. ' +
                ' The high was ' + body.daily.data[0].temperatureHigh +
                ' The low was ' + body.daily.data[0].temperatureLow
            )
        }
    })
}

module.exports = forecast
