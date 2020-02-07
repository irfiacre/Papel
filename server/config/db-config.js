
import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;

if(process.env.NODE_ENV  === 'development'){
    console.log("connected to the database");
    
    pool = new Pool({
        connectionString:process.env.DATABASE_URL,
    });
}

export default pool;