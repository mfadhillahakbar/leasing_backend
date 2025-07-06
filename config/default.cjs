require('dotenv').config();

module.exports = {
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT || '3030'),
  public: './public/',
  origins: ['http://localhost:3030'],
  paginate: {
    default: 10,
    max: 50
  },
  mssql: {
    client: 'mssql',
    connection: {
      server: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '1433'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      options: {
        encrypt: false,
        enableArithAbort: true
      }
    }
  },
  authentication: {
    entity: 'user',
    service: 'user',
    secret: process.env.AUTH_SECRET,
    authStrategies: ['jwt', 'local'],
    jwtOptions: {
      header: { typ: 'access' },
      audience: 'https://yourdomain.com',
      algorithm: 'HS256',
      expiresIn: '1d'
    },
    local: {
      usernameField: 'username',
      passwordField: 'password'
    }
  }
};
