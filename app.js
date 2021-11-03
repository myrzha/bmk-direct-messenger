'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
//const logger = require('morgan');
var http        = require('http');
var path        = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const activityRouter = require('./routes/activity');

var app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': ["'self'"],
        'frame-ancestors': ["'self'", `https://mc.${process.env.STACK}.exacttarget.com`, `https://jbinteractions.${process.env.STACK}.marketingcloudapps.com`],
      },
    },
  }),
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.raw({type: 'application/jwt'}));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, './node_modules/@salesforce-ux/design-system/assets')));

// serve config
app.use('/config.json', routes.config);

// custom activity routes
app.use('/journey/execute/', activityRouter.execute);
app.use('/journey/save/', activityRouter.save);
app.use('/journey/publish/', activityRouter.publish);
app.use('/journey/validate/', activityRouter.validate);

app.get('/', function(req, res){
   res.send(express.static(path.join(__dirname, './public/index.html')));
})

app.use(require('body-parser').raw({
  type: 'application/jwt'
}));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});