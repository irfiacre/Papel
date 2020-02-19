import pool from '../config/db-config';

const tablesCreator = `
DROP TABLE IF EXISTS users,accounts,transactions CASCADE;
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(35) UNIQUE NOT NULL,
  firstName VARCHAR(21) NOT NULL,
  lastName VARCHAR(22) NOT NULL,
  password VARCHAR(300) NOT NULL ,
  type  VARCHAR(25) NOT NULL DEFAULT 'CLIENT',
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS accounts(
  id SERIAL PRIMARY KEY,
  accountNo INT UNIQUE,
  createdOn VARCHAR(100) NOT NULL,
  owner VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  status VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
  balance FLOAT DEFAULT 0.001
);
CREATE TABLE IF NOT EXISTS transactions(
  id SERIAL PRIMARY KEY,
  createdon VARCHAR(100) NOT NULL,
  type VARCHAR(10) NOT NULL,
  cashierid INT NOT NULL,
  accountno INT NOT NULL,
  amount FLOAT NOT NULL,
  oldbalance FLOAT DEFAULT 0.000,
  newbalance FLOAT DEFAULT 0.000
);
INSERT INTO users(email,firstname,lastname,password,type,is_admin)VALUES('admin@mail.com','RASTA','Never','$2b$10$K4EmRPE/zh/b6QxPQiVVaOtnq01okywVrxsJMFr8kL9L2qg24c5gS','staff',true);
INSERT INTO users(email,firstname,lastname,password,type,is_admin)VALUES('cashier@mail.com','Cashier','John','$2b$10$K4EmRPE/zh/b6QxPQiVVaOtnq01okywVrxsJMFr8kL9L2qg24c5gS','cashier',false);
INSERT INTO users(email,firstname,lastname,password,type,is_admin)VALUES('firaduk@gmail.com','NGABO','Joseph','$2b$10$K4EmRPE/zh/b6QxPQiVVaOtnq01okywVrxsJMFr8kL9L2qg24c5gS','client',false);
`;

const tables = async () => {
  await pool.query(tablesCreator).then(() => {
    console.log('Tables Created');
    pool.end();
  }).catch(() => {
    process.exit(0);
  });
};

tables();
