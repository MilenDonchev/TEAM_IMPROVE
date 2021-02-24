require('dotenv').config();
const express = require('express');
const winston = require('winston');
const app = express();
const PORT = process.env.PORT || 4001;

require('./core/logger')();
require('./core/db')();
require('./core/routes')(app);

app.listen(PORT, () => winston.info(`Listening on port ${PORT} ...`));
