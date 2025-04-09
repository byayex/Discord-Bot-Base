export type DatabaseConfig = PostgresConfig | SQLiteConfig;

export enum DatabaseType {
    postgres = 'postgres',
    sqlite  = 'sqlite'
}

export class PostgresConfig {
  host: string = '';
  port: number = 0;
  user: string = '';
  password: string = '';
  database: string = '';
}
export class SQLiteConfig {
  filename: string = "database";
}