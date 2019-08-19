const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')
const hbs = require('hbs')

const app = express()
// Heroku's port for our app
const port = process.env.PORT || 3000

// define custom paths for Express config
const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialssPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialssPath)

// setup directory to serve static html
app.use(express.static(pubDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'NOT Weather',
        name: 'Tom Moellering'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tom Moellering'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tom Moellering'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        name: 'Tom Moellering'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'ERROR: You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    forecastData,
                    location,
                    address: req.query.address
                })
        })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'My 404 page',
        name: 'Tom Moellering'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000!!!')
})