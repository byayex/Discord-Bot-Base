import { DatabaseConfig, DatabaseType, PostgresConfig, SQLiteConfig } from "../../models/Database";

/**
 * Load database configuration from environment variables
 */
export function loadDatabaseConfig(type: DatabaseType): DatabaseConfig {
    switch (type) {
      case DatabaseType.postgres: {
        const config = new PostgresConfig();
        
        config.host = process.env.DB_HOST || '';
        if (!config.host) throw new Error('PostgreSQL configuration error: DB_HOST environment variable is required');
        
        config.user = process.env.DB_USER || '';
        if (!config.user) throw new Error('PostgreSQL configuration error: DB_USER environment variable is required');
        
        config.password = process.env.DB_PASSWORD || '';
        if (!config.password) throw new Error('PostgreSQL configuration error: DB_PASSWORD environment variable is required');
        
        config.database = process.env.DB_NAME || '';
        if (!config.database) throw new Error('PostgreSQL configuration error: DB_NAME environment variable is required');
        
        config.port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
        if (isNaN(config.port)) throw new Error('PostgreSQL configuration error: DB_PORT must be a valid number');
  
        return config;
      }
      
      case DatabaseType.sqlite: {
        const config = new SQLiteConfig();
        
        config.filename = process.env.DB_FILENAME || '';
        if (!config.filename) throw new Error('SQLite configuration error: DB_FILENAME environment variable is required');
        
        return config;
      }
      
      default:
        throw new Error(`Unsupported database type: ${type}`);
    }
  }