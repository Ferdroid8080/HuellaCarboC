const express = require('express');
const app     = express();

const morgan  = require('morgan');
const cors    = require('cors');

const { config } = require('./config/');
require('./config/database');

const routes = require('./routes');

const { 
    logErrors, 
    wrapErrors, 
    errorHandler 
} = require('./middleware/errorHandlers');

const notFoundHandler = require('./middleware/notFoundHandler');

app.set('port', config.port);

// set middlewares
app.use(express.json());
app.use(morgan(config.dev ? 'dev' : 'combined'));
app.use(cors({
    origin: config.cors
}))

// set routes
app.use('/', routes);

// catch a 404 error
app.use(notFoundHandler);

// catch any error
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// start server
app.listen(app.get('port'), 
    () => console.log(`Server is listening on port ${app.get('port')}`)
);
