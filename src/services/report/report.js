// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  reportDataValidator,
  reportPatchValidator,
  reportQueryValidator,
  reportResolver,
  reportExternalResolver,
  reportDataResolver,
  reportPatchResolver,
  reportQueryResolver
} from './report.schema.js'
import { ReportService, getOptions } from './report.class.js'
import { reportPath, reportMethods } from './report.shared.js'

export * from './report.class.js'
export * from './report.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const report = (app) => {
  // Register our service on the Feathers application
  app.use(reportPath, new ReportService(getOptions(app), app), {
    // A list of all methods this service exposes externally
    methods: reportMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(reportPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(reportExternalResolver), schemaHooks.resolveResult(reportResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(reportQueryValidator), schemaHooks.resolveQuery(reportQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(reportDataValidator), schemaHooks.resolveData(reportDataResolver)],
      patch: [schemaHooks.validateData(reportPatchValidator), schemaHooks.resolveData(reportPatchResolver)],
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
