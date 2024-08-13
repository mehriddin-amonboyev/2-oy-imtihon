import pg from 'pg';
import { databaseConfig } from '../config/database.config.js';
const { Pool } = pg;

const pool = new Pool({
    user: databaseConfig.user,
    password: databaseConfig.password,
    host: databaseConfig.host,
    port: databaseConfig.port,
    database: databaseConfig.database,
});

export const fetchData = async (query, ...params) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(query, params?.length ? params : []);
        return rows;
    } catch (error) {
        console.log("db error", error);
    } finally {
        client.release();
    }
};