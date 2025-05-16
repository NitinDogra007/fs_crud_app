import env from 'dotenv';
import pg from 'pg';

env.config();

const db = new pg.Client({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
});

db.connect((err) => {
	if (err) {
		console.error('Failed to connect to PostgreSQL:', err.stack);
	} else {
		console.log('Connected to PostgreSQL');
	}
});

export const query = (text, params) => db.query(text, params);
