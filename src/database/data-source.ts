import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDatabaseConfig } from '../config/database.js';
import { Bill } from '../entities/Bill.js';
import { Document } from '../entities/Document.js';
import { Notification } from '../entities/Notification.js';
import { Reminder } from '../entities/Reminder.js';
import { User } from '../entities/User.js';

const database = parseDatabaseConfig(process.env);
const currentDirectory = dirname(fileURLToPath(import.meta.url));

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: database.DB_HOST,
  port: database.DB_PORT,
  username: database.DB_USERNAME,
  password: database.DB_PASSWORD,
  database: database.DB_NAME,
  entities: [User, Document, Bill, Reminder, Notification],
  migrations: [join(currentDirectory, 'migrations/*{.js,.ts}')],
  synchronize: false,
  migrationsRun: false,
  logging: process.env.NODE_ENV === 'development',
});
