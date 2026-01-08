// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const reportSchema = Type.Object(
  {
    from: { type: 'string', format: 'date' },
    to: { type: 'string', format: 'date' }
  },
  { $id: 'Report', additionalProperties: false }
)
export const reportValidator = getValidator(reportSchema, dataValidator)
export const reportResolver = resolve({})

export const reportExternalResolver = resolve({})

// Schema for creating new entries
export const reportDataSchema = Type.Pick(reportSchema, ['text'], {
  $id: 'ReportData'
})
export const reportDataValidator = getValidator(reportDataSchema, dataValidator)
export const reportDataResolver = resolve({})

// Schema for updating existing entries
export const reportPatchSchema = Type.Partial(reportSchema, {
  $id: 'ReportPatch'
})
export const reportPatchValidator = getValidator(reportPatchSchema, dataValidator)
export const reportPatchResolver = resolve({})

// Schema for allowed query properties
export const reportQueryProperties = Type.Pick(reportSchema, ['from', 'to'])
export const reportQuerySchema = Type.Intersect(
  [
    querySyntax(reportQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const reportQueryValidator = getValidator(reportQuerySchema, queryValidator)
export const reportQueryResolver = resolve({})
