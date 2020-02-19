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

INSERT INTO users(email,firstname,lastname,password)VALUES('fia@mail.com','RASTA','Never','$2b$10$K4EmRPE/zh/b6QxPQiVVaOtnq01okywVrxsJMFr8kL9L2qg24c5gS');
INSERT INTO users(email,firstname,lastname,password,type,is_admin)VALUES('firaduk@gmail.com','NGABO','Joseph','$2b$10$K4EmRPE/zh/b6QxPQiVVaOtnq01okywVrxsJMFr8kL9L2qg24c5gS','client',false);
INSERT INTO users(email,firstname,lastname,password,type,is_admin)VALUES('cashier@mail.com','Cashier','John','$2b$10$K4EmRPE/zh/b6QxPQiVVaOtnq01okywVrxsJMFr8kL9L2qg24c5gS','cashier',false);
INSERT INTO accounts(createdon,owner,email,type,accountno,status) VALUES(2012-12-27,'RASTA Never','fia@mail.com','current',201231,'active');
INSERT INTO accounts(createdon,owner,email,type,accountno,status) VALUES(2012-12-27,'RASTA Never','fia@mail.com','current',200231,'active');
INSERT INTO accounts(createdon,owner,email,type,accountno,status) VALUES(2012-11-20,'RASTA Never','fiaK@mail.com','current',201201,'dormant');
INSERT INTO accounts(createdon,owner,email,type,accountno) VALUES(2012-11-20,'RASTA Never','fiaK@mail.com','current',201901);
INSERT INTO accounts(createdon,owner,email,type,accountno,balance) VALUES(2012-11-25,'kagabo divin','kag@mail.com','savings',201225,12000.001);
INSERT INTO transactions(createdon,type,cashierid,accountno,amount,oldbalance,newbalance) VALUES (2020-10-10,'credit',2,201225,2000,12000,10000);`;

const tables = async () => {
  await pool.query(tablesCreator).then(() => {
    console.log('TEST tables Created');
    pool.end();
  }).catch(() => {
    process.exit(0);
  });
};

tables();
