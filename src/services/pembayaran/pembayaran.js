// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  pembayaranDataValidator,
  pembayaranPatchValidator,
  pembayaranQueryValidator,
  pembayaranResolver,
  pembayaranExternalResolver,
  pembayaranDataResolver,
  pembayaranPatchResolver,
  pembayaranQueryResolver
} from './pembayaran.schema.js'
import { PembayaranService, getOptions } from './pembayaran.class.js'
import { pembayaranPath, pembayaranMethods } from './pembayaran.shared.js'
import { setNow } from 'feathers-hooks-common'
import { restrictAdminRole } from '../../hooks/restrict-admin-role.js'
import { includeTable } from '../../hooks/include-table.js'
import { formatIncludeResult } from '../../hooks/format-include-result.js'

export * from './pembayaran.class.js'
export * from './pembayaran.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const pembayaran = app => {
  // Register our service on the Feathers application
  app.use(pembayaranPath, new PembayaranService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: pembayaranMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(pembayaranPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(pembayaranExternalResolver),
        schemaHooks.resolveResult(pembayaranResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(pembayaranQueryValidator),
        schemaHooks.resolveQuery(pembayaranQueryResolver)
      ],
      find: [
        restrictAdminRole(),
        includeTable(['tb_penjualan'])
      ],
      get: [includeTable(['tb_penjualan'])],
      create: [
        schemaHooks.validateData(pembayaranDataValidator),
        schemaHooks.resolveData(pembayaranDataResolver)
      ],
      patch: [
        schemaHooks.validateData(pembayaranPatchValidator),
        schemaHooks.resolveData(pembayaranPatchResolver),
        restrictAdminRole(),
        setNow('updated_at')
      ],
      remove: [restrictAdminRole()]
    },
    after: {
      all: [formatIncludeResult()]
    },
    error: {
      all: []
    }
  })
}
