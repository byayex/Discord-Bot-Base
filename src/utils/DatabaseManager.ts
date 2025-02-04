import mysql, { RowDataPacket } from 'mysql2';

class DatabaseManager {
    private pool: mysql.Pool;

    constructor() {
        this.pool = mysql.createPool({
            enableKeepAlive: true,
            connectionLimit: 10,
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        this.handlePoolEvents();
        this.createTableIfNotExists();
    }

    private handlePoolEvents(): void {
        this.pool.on('connection', () => {
            console.log('New database connection established');
        });

        this.pool.on('error', (err: Error) => {
            console.error('Database connection error: ' + err.message);
        });
    }

    private async createTableIfNotExists(): Promise<void> {
        
        try {

            const settings_sql = 'CREATE TABLE IF NOT EXISTS settings (name VARCHAR(255) PRIMARY KEY NOT NULL, value VARCHAR(255) NOT NULL)';
            await this.query(settings_sql, []);

            const userdata_sql = ''
            await this.query(userdata_sql, []);

            const teamdata_sql = ''
            await this.query(userdata_sql, []);


        } catch (error) {
            console.error(error)
        }

    }

    public query(sql: string, args: (string | number)[]): Promise<RowDataPacket[] | Error> {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, args, (err: Error | null, rows: RowDataPacket[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }

    public end(): void {
        this.pool.end((err) => {
            if (err) {
                console.error('Error ending the database pool: ' + err.message);
            } else {
                console.log('Database pool has been closed');
            }
        });
    }
}

export default DatabaseManager;