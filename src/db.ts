import { createPool } from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE } from './config';

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: DB_DATABASE
});
