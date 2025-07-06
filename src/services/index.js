import { pelanggan } from './pelanggan/pelanggan.js'
import { pembayaran } from './pembayaran/pembayaran.js'
import { penjualan } from './penjualan/penjualan.js'
import { motor } from './motor/motor.js'
import { role } from './role/role.js'
import { user } from './user/user.js'
export const services = app => {
  app.configure(pelanggan)

  app.configure(pembayaran)

  app.configure(penjualan)

  app.configure(motor)

  app.configure(role)

  app.configure(user)

  // All services will be registered here
}
