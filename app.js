'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var http        = require('http');
var path        = require('path');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.raw({type: 'application/jwt'}));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, './node_modules/@salesforce-ux/design-system/assets')));
//app.use('/', "/public/customActivity.js")

app.get('/', function(req, res){
   res.send(express.static(path.join(__dirname, './public/index.html')));
})

app.use(require('body-parser').raw({
  type: 'application/jwt'
}));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});