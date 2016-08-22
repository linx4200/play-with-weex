var path = require('path')
var express = require('express')
var port;

var app = express()

port = process.env.PORT || 12580;
require('../build/dev-server')(app)

// if (process.env.NODE_ENV !== 'production') {
//   var config = require('../config')
//   port = process.env.PORT || config.dev.port;
//   require('../build/dev-server')(app)
// } else {
//   // 生产环境
//   port = process.env.PORT || 8080;
//   app.set('view engine', 'ejs');
//   app.use('/static', express.static(path.join(__dirname, '../static')))
//   app.get('/', function(req, res) {
//     res.render('index');
//   });
//   app.get('*', function(req, res, next) {
//     res.status(404).send('Sorry cant find that!');
//   });
// }

// serve pure static assets
// var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
