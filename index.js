const thepiratebay = require('thepiratebay');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    next()
}

// app.use(allowCrossDomain)


app.use(express.static('public'))

app.post('/api/search', bodyParser.urlencoded({ extended: false }), (req, res) => {
  if (req.body.search == undefined) {
    res.send("not found")
    return
  }
  thepiratebay.search(req.body.search)
  .then(results => {
    res.send(results)
  })
  .catch(err => {
    res.send(err)
  })
})

app.listen(8080)
