const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYzlhZHJpYW4iLCJhIjoiY2t6NHNtamR4MGh6YjMwcHZuMWVlemF4cyJ9.1WENkcaIBbwWXxFM7HlcfA&limit=1'

    request({url: url, json: true}, (error, response) => {
        if(error) 
        {
            callback('Unable to connect to services', undefined) 
        }
        else if (response.body.features.length===0)
        {
            callback('Unable to find location' , undefined)
        }

        else
        {
            callback(undefined, {
                latitiude: response.body.features[0].center[1],
                longitiude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode