// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const pembayaranSchema = Type.Object(
  {
    id_pembayaran: Type.Number(),
    id_penjualan: Type.Number(),
    cicilan: Type.Number()
  },
  { $id: 'Pembayaran', additionalProperties: false }
)
export const pembayaranValidator = getValidator(pembayaranSchema, dataValidator)
export const pembayaranResolver = resolve({})

export const pembayaranExternalResolver = resolve({})

// Schema for creating new entries
export const pembayaranDataSchema = Type.Pick(pembayaranSchema, ['id_penjualan', 'cicilan'], {
  $id: 'PembayaranData'
})
export const pembayaranDataValidator = getValidator(pembayaranDataSchema, dataValidator)
export const pembayaranDataResolver = resolve({})

// Schema for updating existing entries
export const pembayaranPatchSchema = Type.Partial(pembayaranSchema, {
  $id: 'PembayaranPatch'
})
export const pembayaranPatchValidator = getValidator(pembayaranPatchSchema, dataValidator)
export const pembayaranPatchResolver = resolve({})

// Schema for allowed query properties
export const pembayaranQueryProperties = Type.Pick(pembayaranSchema, ['id_pembayaran', 'id_penjualan', 'cicilan'])
export const pembayaranQuerySchema = Type.Intersect(
  [
    querySyntax(pembayaranQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const pembayaranQueryValidator = getValidator(pembayaranQuerySchema, queryValidator)
export const pembayaranQueryResolver = resolve({})
