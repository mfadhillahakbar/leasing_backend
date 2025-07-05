require('dotenv').config();

module.exports = {
  host: 'localhost',
  port: 3030,
  public: './public/',
  origins: ['http://localhost:3030'],
  paginate: {
    default: 10,
    max: 50
  },
  mssql: {
    client: process.env.DB_CLIENT,
    connection: {
      server: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      options: {
        encrypt: process.env.DB_ENCRYPT === 'false',
        enableArithAbort: process.env.DB_ARITH_ABORT === 'true'
      }
    }
  }
}