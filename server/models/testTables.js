import pool from '../config/db-config';

const tablesCreator = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(35) UNIQUE NOT NULL,
  firstName VARCHAR(21) NOT NULL,
  lastName VARCHAR(22) NOT NULL,
  password VARCHAR(300) NOT NULL ,
  type  VARCHAR(25) NOT NULL DEFAULT 'CLIENT',
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO users(email,firstname,lastname,password)VALUES('fi@mail.com','RASTA','Never','$2b$10$c1wOrxcGDy.uYxedZn4qEOnq/O2R9rNQPDJnwkvNiEDWVK76yT4Yy');`;

const tables = async () => {
  await pool.query(tablesCreator).then(() => {
    console.log('TEST tables Created');
    pool.end();
  }).catch(() => {
    process.exit(0);
  });
};

tables();
