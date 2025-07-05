import { user } from './user/user.js'
export const services = app => {
  app.configure(user)

  // All services will be registered here
}
