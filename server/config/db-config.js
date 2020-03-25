import { config } from 'dotenv';

config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
};
// export const test = {
//   url: process.env.DATABASE_URL,
//   dialect: 'postgres',
//   logging: false,
// };
// export const production = {
//   url: process.env.DATABASE_URL,
//   dialect: 'postgres',
//   logging: false,
// };



// export const development = {
//   url: process.env.DATABASE_URL,
//   dialect: 'postgres',
//   logging: false,
// };
// export const test = {
//   url: process.env.DATABASE_URL,
//   dialect: 'postgres',
//   logging: false,
// };
// export const production = {
//   url: process.env.DATABASE_URL,
//   dialect: 'postgres',
//   logging: false,
// };