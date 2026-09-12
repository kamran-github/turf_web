// const winston = require('winston');

// /**
//  * Logger instance configured with Winston.
//  * 
//  * This logger is set to log messages at the 'info' level and above.
//  * It formats the log messages in JSON format.
//  * 
//  * Transports:
//  * - Console: Logs messages to the console.
//  * 
//  * @type {winston.Logger}
//  */
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'logs/api.log' })
//   ]
// });

// module.exports = logger;

const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      )
    })
  ],

  exitOnError: false
});

module.exports = logger;
