const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes

app.use('/plants', require('./controllers/plants'));
app.use('/fishing-gear', require('./controllers/fishing-gear'));
app.use('/star-trek', require('./controllers/star-trek'));
app.use('/beauty-supplies', require('./controllers/beauty-supplies'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
