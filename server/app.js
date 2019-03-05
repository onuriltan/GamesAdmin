const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./app/routes');

// Read Environment Variables
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err));

// Load Initial Data to MongoDB
const initialDataLoader = require('./app/helpers/InitialDataLoader');
initialDataLoader.loadData();

// Middlewares for Express
app.use(bodyParser.urlencoded({extended: false})); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('tiny')); // Log requests to API using morgan
app.use(cors());

// Load Routes
router(app);

// Serve Vue SPA
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));
    // Redirect All Routers to SPA
    app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// Run the Express App
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
});
