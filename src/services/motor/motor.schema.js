// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const motorSchema = Type.Object(
  {
    id_motor: Type.Number(),
    tipe_motor: Type.String({ maxLength: 30 }),
    jumlah_stok: Type.Number()
  },
  { $id: 'Motor', additionalProperties: false }
)
export const motorValidator = getValidator(motorSchema, dataValidator)
export const motorResolver = resolve({})

export const motorExternalResolver = resolve({})

// Schema for creating new entries
export const motorDataSchema = Type.Pick(motorSchema, ['tipe_motor', 'jumlah_stok'], {
  $id: 'MotorData'
})
export const motorDataValidator = getValidator(motorDataSchema, dataValidator)
export const motorDataResolver = resolve({})

// Schema for updating existing entries
export const motorPatchSchema = Type.Partial(motorSchema, {
  $id: 'MotorPatch'
})
export const motorPatchValidator = getValidator(motorPatchSchema, dataValidator)
export const motorPatchResolver = resolve({})

// Schema for allowed query properties
export const motorQueryProperties = Type.Pick(motorSchema, ['id_motor', 'tipe_motor', 'jumlah_stok'])
export const motorQuerySchema = Type.Intersect(
  [
    querySyntax(motorQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const motorQueryValidator = getValidator(motorQuerySchema, queryValidator)
export const motorQueryResolver = resolve({})
