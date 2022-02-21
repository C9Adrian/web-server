const request = require('request')

const forcast = (lat,longitiude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=185fae611403a27e4aee6854146b528a&query=' + lat + ',' + longitiude + '&units=f'

    request({url: url, json: true}, (error, response) => {
        if(error)
        {
            callback('unable to connect to weather services', undefined)
        }
        else if(response.body.success === false)
        {
            callback(response.body.error, undefined)
        }
        else
        {
            callback(undefined,'It is ' +  response.body.current.temperature + 'F with a ' + response.body.current.humidity + ' rating')
        }
    })
}

module.exports = forcast
