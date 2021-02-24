const winston = require('winston');
require('express-async-errors');


module.exports = function () {
  winston.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple())
  }));
  winston.add(new winston.transports.File({ level: 'info', filename: 'info.log' }));

  winston.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({ level: 'error', filename: 'uncaughtExceptions.log' }),
  );

  winston.addColors({
    colors: {
      error: "red",
      warn: "yellow",
      info: "cyan",
    }
  })

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

};