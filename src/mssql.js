import { db } from '../knexfile.js'

export const mssql = app => {
  app.set('mssqlClient', db)
}
