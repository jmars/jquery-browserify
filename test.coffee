express = require 'express'
app = module.exports = express.createServer()
browserify = require 'browserify'

app.configure ->
  app.set 'views', "#{__dirname}/views"
  app.set 'view engine', 'jade'
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser()
  app.use browserify
    require: [
      'jquery-browserify'
    ]
  app.use app.router
  
app.get '/', (req, res) ->
  res.send "<script src='/browserify.js'></script>"
  
app.listen 3000