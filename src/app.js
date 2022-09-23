if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const notFound = require('./errors/notFound.js');

const moviesRouter = require('./movies/movies.router.js');
const theatersRouter = require('./theaters/theaters.router.js');
const reviewsRouter = require('./reviews/reviews.router.js');

app.use(cors())
app.use(express.json());

app.use('/movies', moviesRouter);

app.use('/theaters', theatersRouter);

app.use('/reviews', reviewsRouter);

app.use(notFound);

// Error handler
app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
});

module.exports = app;
