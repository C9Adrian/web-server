const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { read } = require('fs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

//paths for express configs
const viewPaths = path.join(__dirname, '../templates/views')
const paritalPath = path.join(__dirname, '../templates/paritals')

const app = express()

//setup handlerbars engine
app.set('view engine', 'hbs')
app.set('views' , viewPaths)
hbs.registerPartials(paritalPath)

//setup static directory 
app.use(express.static(path.join(__dirname , '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Created by Adrian Ruiz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Created by Adrian Ruiz'
    })
})

app.get('/help', (req, res) => {
    res.render('help' , {
        helpMsg: 'Help Msg', 
        title: 'Help',
        name: 'Created by Adrian Ruiz'
    }) 
})
app.get('/weather' , (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitiude, longitiude, location} = {}) => 
    {
        if(error) {
            return res.send({error})
        }
        forcast(latitiude, longitiude, (error, forcastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        })
    })
    
    // res.send({
    //     forcast: 'it is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products', (req ,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*' , (req, res) => 
{
    res.send('404 page')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})