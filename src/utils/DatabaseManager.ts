import { Pool, QueryResult } from 'pg';

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

    // Disabling the error because we want to have the any (cant cast it to unknown i guess :|)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async query(sql: string, args: (string | number)[]): Promise<QueryResult<any>> {
        const res = await this.pool.query(sql, args);
        return res;
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