const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const passport = require('passport');
const config = require('./config.js');
const logger = require('./logger');

const app = express();
// enable all cors call
app.use(cors());

// event emitter
app.eventEmitter = new events.EventEmitter();
require('./services/eventService.js')(app.eventEmitter);

// bootstrap deps to app instance as DI container
app.data = require('./services/dataService.js')();

app.myRouter = express.Router();

// load config
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
app.config = config[env];

// convert request and respond bodies to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// authentication
app.use(passport.initialize());
const authenticationHandler = require('./routesHandlers/authenticationHandler.js');

// mout data entity routes
const dataEntityHandler = require('./routesHandlers/dataEntityHandler.js')(app);

app.use('/api/v1/entity', authenticationHandler.isAuthenticated, dataEntityHandler);

// error catcher
const notFoundDataHandler = require('./routesHandlers/notFoundDataHandler.js');

app.use((req, res) => notFoundDataHandler(req, res, app.eventEmitter));

// start server on port 3000
app.listen(app.config.port, () => logger.debug('App listening on port 3000'));

process.on('uncaughtException', () => process.exit(1));

module.exports = app;
