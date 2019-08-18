const request = require('request')

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidG1vZWxsZXIzMjgiLCJhIjoiY2p6YmVxbjl2MDA5OTNucW41NWo3ODlkcCJ9.yyntVipVMcGzFEA9pEA9wg&limit=1'
    request({ url, json: true }, (error, {body}) => {
        // console.log('Error: '+error)
        // console.log('Body: '+body)
        // console.log('features: '+body.features)
        if (error) {
            callback('ERROR: Unable to connect to location services')
        } else if (!body.features || body.features.length === 0) {
            callback('ERROR: Bad location')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
