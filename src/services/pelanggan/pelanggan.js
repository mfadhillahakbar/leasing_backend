// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  pelangganDataValidator,
  pelangganPatchValidator,
  pelangganQueryValidator,
  pelangganResolver,
  pelangganExternalResolver,
  pelangganDataResolver,
  pelangganPatchResolver,
  pelangganQueryResolver
} from './pelanggan.schema.js'
import { PelangganService, getOptions } from './pelanggan.class.js'
import { pelangganPath, pelangganMethods } from './pelanggan.shared.js'
import { setNow } from 'feathers-hooks-common'
import { restrictAdminRole } from '../../hooks/restrict-admin-role.js'
import { createcustomerUser } from '../../hooks/create-customer-user.js'

export * from './pelanggan.class.js'
export * from './pelanggan.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const pelanggan = app => {
  // Register our service on the Feathers application
  app.use(pelangganPath, new PelangganService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: pelangganMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(pelangganPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(pelangganExternalResolver),
        schemaHooks.resolveResult(pelangganResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(pelangganQueryValidator),
        schemaHooks.resolveQuery(pelangganQueryResolver)
      ],
      find: [restrictAdminRole()],
      get: [],
      create: [
        schemaHooks.validateData(pelangganDataValidator),
        schemaHooks.resolveData(pelangganDataResolver)
      ],
      patch: [
        schemaHooks.validateData(pelangganPatchValidator),
        schemaHooks.resolveData(pelangganPatchResolver),
        setNow('updated_at')
      ],
      remove: []
    },
    after: {
      all: [],
      create: [createcustomerUser()],
    },
    error: {
      all: []
    }
  })
}
