// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'

class CustomLocalStrategy extends LocalStrategy {
  async findEntity(username, params) {
    const entityService = this.app.service('user')
    const query = {
      [this.configuration.usernameField]: username,
      ...params.query
    }

    const result = await entityService.find({ ...params, query })
    const list = Array.isArray(result) ? result : result.data

    if (!list.length) {
      throw new Error('Invalid login')
    }

    return list[0]
  }
}

export const authentication = app => {
  const authService = new AuthenticationService(app, 'authentication', {
    service: 'user',
    entity: 'user',
    entityId: 'id',
    secret: app.get('authentication').secret,
    authStrategies: ['jwt', 'local'],
    jwtOptions: {
      header: { typ: 'access' },
      algorithm: 'HS256',
      expiresIn: '1d'
    },
    local: {
      usernameField: 'username',
      passwordField: 'password'
    }
  })

  authService.register('jwt', new JWTStrategy())
  authService.register('local', new CustomLocalStrategy())

  app.use('/authentication', authService)
}