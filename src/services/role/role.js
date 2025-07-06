// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  roleDataValidator,
  rolePatchValidator,
  roleQueryValidator,
  roleResolver,
  roleExternalResolver,
  roleDataResolver,
  rolePatchResolver,
  roleQueryResolver
} from './role.schema.js'
import { RoleService, getOptions } from './role.class.js'
import { rolePath, roleMethods } from './role.shared.js'
import { setNow } from 'feathers-hooks-common'

export * from './role.class.js'
export * from './role.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const role = app => {
  // Register our service on the Feathers application
  app.use(rolePath, new RoleService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: roleMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(rolePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(roleExternalResolver),
        schemaHooks.resolveResult(roleResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(roleQueryValidator),
        schemaHooks.resolveQuery(roleQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(roleDataValidator),
        schemaHooks.resolveData(roleDataResolver)
      ],
      patch: [
        schemaHooks.validateData(rolePatchValidator),
        schemaHooks.resolveData(rolePatchResolver),
        setNow('updated_at')
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
