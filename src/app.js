'use strict';

// Third-party resources
const express = require ('express');
const router = require ('./routes/route');


// Prepare the Experss app
const app = express();

app.use(router);

// exports app
module.exports = {
  start: (port) => {
    const PORT = port || 3000;
    app.listen(PORT, () => console.log(`server up on ${PORT}.`));
  }
};
