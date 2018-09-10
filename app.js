const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const config = require('./config.js');
const routes = require('./routes');

const app = express();
// enable all cors call
app.use(cors());

// event emitter
app.eventEmitter = new events.EventEmitter();
require('./services/eventService.js')(app.eventEmitter);

// bootstrap deps to app instance as DI container
// app.data = require('./services/dataService.js');

app.myRouter = express.Router();

// load config
app.config = config;

// convert request and respond bodies to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// authentication
// app.use(passport.initialize());

app.use('/api/v1', routes);

// error catcher
const notFoundDataHandler = require('./routesHandlers/notFoundDataHandler.js');

app.use((req, res) => notFoundDataHandler(req, res, app.eventEmitter));

process.on('uncaughtException', () => process.exit(1));

module.exports = app;
