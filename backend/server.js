require('dotenv').config(); // Read ENV Files
const express = require('express');
const bodyParser = require('body-parser');

const { getDolar } = require('./lib/fixer-service');
const { getGBP } = require('./lib/fixer-service');
const { getMXN } = require('./lib/fixer-service');



const app = express();
const port = process.env.PORT || 3000;


// Set Public Folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules Folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Parse POST data as URL encoded data
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Parse POST data as json
app.use(bodyParser.json());

// Express Error handler
const errorHandler = (err, req, res) => {
  if (err.response) {
    // The request was made and the server responsed with a status code
    // that fails out of the range of 2xx
    res.status(403).send({title: 'Server responded with an error', message: err.message });
  } else if (err.request) {
    // The request was made but no response was received
    res.status(503).send({ title: 'Unable to communicate with server', message: err.message });
  } else {
    // Something happened in setting up the request that triggered an error
    res.status(500).send({ title: 'An unexpected error occured', message: err.message });
  }
};

app.get('/mxn', async (req, res) => {
  try {
    const data = await getMXN();
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

app.get('/dolar', async (req, res) => {
  try {
    const data = await getDolar();
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

app.get('/gbp', async (req, res) => {
  try {
    const data = await getGBP();
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Listen for HTTP request on PORT 3000
app.listen(port, () => {
  console.log('listening on %d', port);
});

