// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import authenticationLocal from '@feathersjs/authentication-local'

const { hashPassword, protect } = authenticationLocal.hooks

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver
} from './user.schema.js'
import { UserService, getOptions } from './user.class.js'
import { userPath, userMethods } from './user.shared.js'
import { setNow } from 'feathers-hooks-common'
import { includeTable } from '../../hooks/include-table.js'
import { formatIncludeResult } from '../../hooks/format-include-result.js'
import { restrictAdminRole } from '../../hooks/restrict-admin-role.js'

export * from './user.class.js'
export * from './user.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const user = app => {
  // Register our service on the Feathers application
  app.use(userPath, new UserService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(userPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(userExternalResolver),
        schemaHooks.resolveResult(userResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(userQueryValidator),
        schemaHooks.resolveQuery(userQueryResolver)
      ],
      find: [
        authenticate('jwt'),
        restrictAdminRole(),
        includeTable(['role'])
      ],
      get: [
        authenticate('jwt'),
        includeTable(['role'])
      ],
      create: [
        schemaHooks.validateData(userDataValidator),
        schemaHooks.resolveData(userDataResolver),
        hashPassword('password')
      ],
      patch: [
        authenticate('jwt'),
        schemaHooks.validateData(userPatchValidator),
        schemaHooks.resolveData(userPatchResolver),
        restrictAdminRole(),
        hashPassword('password'),
        setNow('updated_at')
      ],
      remove: [restrictAdminRole()]
    },
    after: {
      all: [
        protect('password'),
        formatIncludeResult()
      ]
    },
    error: {
      all: []
    }
  })
}
