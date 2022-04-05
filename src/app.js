const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Gaurav Sharma'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Gaurav Sharma'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: 'Please contact for more details.',
    title: 'Help',
    name: 'Gaurav Sharma'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'Please provide an address.'
    })
  }
  forecast(req.query.address, (error,{forecast, location} ={} ) => {
    if(error){
      return res.send({error})
    }
    else{
      res.send({
        forecast,
        location,
        address: req.query.address
      })
    }
  })
})

app.get('/help/*', (req, res) => {
  res.render('404page',{
    title: '404 help',
    name: 'Gaurav Sharma',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404page',{
    title: '404',
    name: 'Gaurav Sharma',
    errorMessage: 'Page not found.'
  })
})

app.listen(3000, () => {
  console.log('server is up on port 3000')
})