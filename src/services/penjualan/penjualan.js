// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  penjualanDataValidator,
  penjualanPatchValidator,
  penjualanQueryValidator,
  penjualanResolver,
  penjualanExternalResolver,
  penjualanDataResolver,
  penjualanPatchResolver,
  penjualanQueryResolver
} from './penjualan.schema.js'
import { PenjualanService, getOptions } from './penjualan.class.js'
import { penjualanPath, penjualanMethods } from './penjualan.shared.js'
import { setNow } from 'feathers-hooks-common'

export * from './penjualan.class.js'
export * from './penjualan.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const penjualan = app => {
  // Register our service on the Feathers application
  app.use(penjualanPath, new PenjualanService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: penjualanMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(penjualanPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(penjualanExternalResolver),
        schemaHooks.resolveResult(penjualanResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(penjualanQueryValidator),
        schemaHooks.resolveQuery(penjualanQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(penjualanDataValidator),
        schemaHooks.resolveData(penjualanDataResolver)
      ],
      patch: [
        schemaHooks.validateData(penjualanPatchValidator),
        schemaHooks.resolveData(penjualanPatchResolver),
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
