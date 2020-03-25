import fs from 'fs';
import path from 'path';
import 'dotenv';
import Sequelize from 'sequelize';
import configFile from '../config/db-config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const config = configFile[env];


const db = {};
config.logging = false;

const sequelize = new Sequelize(configFile[env].url, config);

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
