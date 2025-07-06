// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  motorDataValidator,
  motorPatchValidator,
  motorQueryValidator,
  motorResolver,
  motorExternalResolver,
  motorDataResolver,
  motorPatchResolver,
  motorQueryResolver
} from './motor.schema.js'
import { MotorService, getOptions } from './motor.class.js'
import { motorPath, motorMethods } from './motor.shared.js'
import { setNow } from 'feathers-hooks-common'
import { restrictAdminRole } from '../../hooks/restrict-admin-role.js'

export * from './motor.class.js'
export * from './motor.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const motor = app => {
  // Register our service on the Feathers application
  app.use(motorPath, new MotorService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: motorMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(motorPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(motorExternalResolver),
        schemaHooks.resolveResult(motorResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(motorQueryValidator),
        schemaHooks.resolveQuery(motorQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(motorDataValidator),
        schemaHooks.resolveData(motorDataResolver),
        restrictAdminRole()
      ],
      patch: [
        schemaHooks.validateData(motorPatchValidator),
        schemaHooks.resolveData(motorPatchResolver),
        restrictAdminRole(),
        setNow('updated_at')
      ],
      remove: [restrictAdminRole()]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
