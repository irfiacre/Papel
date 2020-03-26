import path from 'path';
import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const level = process.env.NODE_LOGGING_LEVEL || 'info';

const logger = winston.createLogger({
  name: 'papel',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({ colorize: true }),
    new winston.transports.File({
      colorize: true,
      json: true,
      filename: './logger.js',
      level: 'info',
    }),
    new winston.transports.File({
      colorize: false,
      json: true,
      filename: './logger.js',
      level: 'debug',
    }),
  ],
  streams: [
    {
      level,
      stream: process.stdout,
    },
    {
      level,
      path: path.resolve(__dirname, '.', 'logger.js'),
    },
  ],
});

export default logger;
