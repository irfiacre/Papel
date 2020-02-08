import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;

if (process.env.NODE_ENV === 'development') {
  console.log('connected to the database');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}else if (process.env.NODE_ENV === 'testing') {
  pool = new Pool({
    connectionString: process.env.TESTDATABASE_URL,
  });

  pool.on('connect', () => {
  });

} else if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  pool.on('connect', () => {
  });
}

export default pool;
