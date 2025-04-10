import knex, { Knex } from 'knex';
import { DatabaseConfig, DatabaseType } from '../../models/Database';
import { loadDatabaseConfig } from './DatabaseConfig';

export class DatabaseManager {
    public readonly db: Knex;
    private dbType: DatabaseType;

    constructor(type: DatabaseType, config: DatabaseConfig) {
        this.dbType = type;

        switch (type) {
            case DatabaseType.postgres: {
                this.db = knex({
                    client: 'pg',
                    connection: config,
                    pool: { min: 0, max: 10 }
                });

                console.log('PostgreSQL connection configured');
                break;
            }

            case DatabaseType.sqlite: {
                this.db = knex({
                    client: 'sqlite3',
                    connection: config,
                    useNullAsDefault: true
                });

                console.log('SQLite connection configured');
                break;
            }

            default:
                throw new Error(`Unsupported database type: ${type}`);
        }
    }

    /**
     * Execute a callback within a transaction
     */
    public async transaction<T>(callback: (trx: Knex.Transaction) => Promise<T>): Promise<T> {
        return await this.db.transaction(callback);
    }

    /**
     * Close database connections
     */
    public async end(): Promise<void> {
        try {
            await this.db.destroy();
            console.log(`${this.dbType} connections have been closed`);
        } catch (err) {
            console.error(`Error ending the ${this.dbType} connections:`, err);
        }
    }
}

/**
 * Factory function to create a database manager
 */
export function createDatabase(type?: DatabaseType, config?: DatabaseConfig): DatabaseManager {
    if (!type) {
        type = process.env.DATABASE_TYPE as DatabaseType ?? DatabaseType.sqlite;
    }
    if (!config) {
        config = loadDatabaseConfig(type);
    }
    return new DatabaseManager(type, config);
}

export default {
    createDatabase
};