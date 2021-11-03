'use strict';

const activityRouter = require('./routes/activity');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const httpErrors = require('http-errors');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const activityRouter = require('./routes/activity');

var express     = require('express');
var bodyParser  = require('body-parser');
var http        = require('http');
var path        = require('path');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.raw({type: 'application/jwt'}));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, './node_modules/@salesforce-ux/design-system/assets')));


app.get('/', function(req, res){
   res.send(express.static(path.join(__dirname, './public/index.html')));
})

// custom activity routes
app.use('/journey/execute/', activityRouter.execute);
app.use('/journey/save/', activityRouter.save);
app.use('/journey/publish/', activityRouter.publish);
app.use('/journey/validate/', activityRouter.validate);

app.use(require('body-parser').raw({
  type: 'application/jwt'
}));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});