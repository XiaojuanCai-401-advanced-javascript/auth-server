'use strict';

require('dotenv').config();
const mongoose = require ('mongoose');
const server = require('./src/app.js');

const {MONGODB_URI, PORT} = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then (() => {
  console.log('Database connected.');
  server.start(PORT);
});



