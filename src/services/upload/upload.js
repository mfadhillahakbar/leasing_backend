// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  uploadDataValidator,
  uploadPatchValidator,
  uploadQueryValidator,
  uploadResolver,
  uploadExternalResolver,
  uploadDataResolver,
  uploadPatchResolver,
  uploadQueryResolver
} from './upload.schema.js'
import { UploadService, getOptions } from './upload.class.js'
import { uploadPath, uploadMethods } from './upload.shared.js'
import multer from 'multer'
import { BadRequest } from '@feathersjs/errors'

const uploadMulter = multer({ storage: multer.memoryStorage() }).single('file')

export * from './upload.class.js'
export * from './upload.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const upload = app => {
  // Register our service on the Feathers application
  app.use(uploadPath,
    (req, res, next) => {
      req.feathers.__req = req
      req.feathers.__res = res
      next()
    },
    (req, res, next) => {
      uploadMulter(req, res, err => {
        if (err) return next(new BadRequest('Gagal mengunggah gambar', err))
        next()
      })
    },
    new UploadService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: uploadMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(uploadPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(uploadExternalResolver), schemaHooks.resolveResult(uploadResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(uploadQueryValidator), schemaHooks.resolveQuery(uploadQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(uploadDataValidator), schemaHooks.resolveData(uploadDataResolver)],
      patch: [schemaHooks.validateData(uploadPatchValidator), schemaHooks.resolveData(uploadPatchResolver)],
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
