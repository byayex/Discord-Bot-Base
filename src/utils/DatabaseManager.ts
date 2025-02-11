import { Pool } from 'pg';

class DatabaseManager {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            host: process.env.PG_HOST,
            port: Number(process.env.PG_PORT),
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
        });
        this.handlePoolEvents();
        this.createTableIfNotExists();
    }

    private handlePoolEvents(): void {
        this.pool.on('connect', () => {
            console.log('New database connection established');
        });

        this.pool.on('error', (err) => {
            console.error('Database connection error: ' + err.message);
        });
    }

    private async createTableIfNotExists(): Promise<void> {
        try {
            const settings_sql = `CREATE TABLE IF NOT EXISTS settings (
                name VARCHAR(255) PRIMARY KEY NOT NULL,
                value VARCHAR(255) NOT NULL
            )`;
            await this.query(settings_sql, []);
        } catch (error) {
            console.error(error);
        }
    }

    public async query(sql: string, args: (string | number)[]): Promise<unknown[]> {

        const client = await this.pool.connect();

        try {
            const res = await client.query(sql, args);
            return res.rows;
        // Disabling warning because we want to release it.
        // eslint-disable-next-line no-useless-catch
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    }

    public async end(): Promise<void> {
        try {
            await this.pool.end();
            console.log('Database pool has been closed');
        } catch (err) {
            console.error('Error ending the database pool: ' + err);
        }
    }
}

export default DatabaseManager;