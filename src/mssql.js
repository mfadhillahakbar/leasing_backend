import { db } from './knex.js'

export const mssql = app => {
  app.set('mssqlClient', db)
}
