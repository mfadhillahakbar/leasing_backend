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
import { restrictAdminRole } from '../../hooks/restrict-admin-role.js'
import { includeTable } from '../../hooks/include-table.js'
import { formatIncludeResult } from '../../hooks/format-include-result.js'
import { handleSearch } from '../../hooks/handle-search.js'

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
      find: [
        restrictAdminRole(),
        includeTable(['user', 'tb_motor', 'tb_pelanggan']),
        handleSearch(['tb_pelanggan.nama', 'tb_motor.tipe_motor']),
      ],
      get: [includeTable(['user', 'tb_motor', 'tb_pelanggan'])],
      create: [
        schemaHooks.validateData(penjualanDataValidator),
        schemaHooks.resolveData(penjualanDataResolver)
      ],
      patch: [
        schemaHooks.validateData(penjualanPatchValidator),
        schemaHooks.resolveData(penjualanPatchResolver),
        restrictAdminRole(),
        setNow('updated_at')
      ],
      remove: []
    },
    after: {
      all: [formatIncludeResult()],
    },
    error: {
      all: []
    }
  })
}
