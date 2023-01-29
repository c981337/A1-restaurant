// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurants.json')
//require express-handlebars
const exphbs = require('express-handlebars')
//setting template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))

//route setting
app.get('/', (req, res) => {
  res.render('index', { restaurants : restaurantList.results})
})
//restaurant detail
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantFinder = restaurantList.results.find( x => x.id.toString() === req.params.restaurant_id)
  res.render('description', { restaurant : restaurantFinder})
})
//search bar
app.get('/search', (req, res) => {
  const restaurantFilter = restaurantList.results.filter( x => x.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
  console.log(restaurantFilter)
  res.render('index', { restaurants : restaurantFilter, keyword : req.query.keyword})
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})