import { DataSource } from 'typeorm';
//process.env.DB_NAME
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: ['dist/**/migrations/**/*{.ts,.js}'],
});
