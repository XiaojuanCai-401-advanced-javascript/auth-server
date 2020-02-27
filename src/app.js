'use strict';

// Third-party resources
const express = require ('express');
const cors = require ('cors');
const morgan = require ('morgan');
const path = require('path');
const errorHandler = require('./middleware/error-handler');

const authRouter = require ('./routes/auth-router');

// Prepare the Experss app
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler);
app.use(authRouter);

// exports app
module.exports = {
  start: (port) => {
    const PORT = port || 3000;
    app.listen(PORT, () => console.log(`server up on ${PORT}.`));
  }
};
