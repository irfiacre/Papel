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
  accountNo SERIAL UNIQUE,
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
  accountno INT NOT NULL,
  amount FLOAT NOT NULL,
  oldbalance FLOAT DEFAULT 0.000,
  newbalance FLOAT DEFAULT 0.000
);
INSERT INTO transactions(createdon,type,accountno,amount,oldbalance,newbalance) VALUES (20-20-5,'credit',1,10,0,10);
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
