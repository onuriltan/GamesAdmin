const express    = require('express');
const app        = express();
const mongoose   = require('mongoose');
const logger     = require('morgan');
const bodyParser = require('body-parser');
const cors       = require('cors');

const router = require('./app/routes');

// Environment Variables
const dotenv = require('dotenv');
dotenv.config();

const dbAddress = process.env.MONGO_URL;
mongoose.connect(dbAddress, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err));

// Load Initial Data
const dataLoader = require('./app/helpers/DataLoader');
dataLoader.loadData();

// Middlewares for Express
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

router(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
});
