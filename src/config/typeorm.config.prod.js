const { DataSource } = require('typeorm');
const path = require('path');

// В production переменные окружения уже доступны через process.env
// Не используем dotenv, так как он может быть не установлен в production

module.exports = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'nestjs_db',
  entities: [
    path.join(__dirname, '../modules/**/*.entity.js'),
    path.join(__dirname, '../entities/*.entity.js'),
  ],
  migrations: [path.join(__dirname, '../migrations/*.js')],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  // SSL only if explicitly enabled via DB_SSL env variable
  // CapRover internal connections don't need SSL
  ssl: process.env.DB_SSL === 'true' 
    ? { rejectUnauthorized: false } 
    : false,
});

