import { role } from './role/role.js'
import { user } from './user/user.js'
export const services = app => {
  app.configure(role)

  app.configure(user)

  // All services will be registered here
}
