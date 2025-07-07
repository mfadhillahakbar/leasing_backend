// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const penjualanSchema = Type.Object(
  {
    id_penjualan: Type.Number(),
    no_kontrak: Type.String({ maxLength: 10 }),
    id_pelanggan: Type.Number(),
    id_motor: Type.Number(),
    id_user: Type.Number(),
    uang_muka: Type.Number({ minimum: 0 }),
    tenor: Type.Number({ minimum: 0 }),
    angsuran: Type.Number({ minimum: 0 })
  },
  { $id: 'Penjualan', additionalProperties: false }
)
export const penjualanValidator = getValidator(penjualanSchema, dataValidator)
export const penjualanResolver = resolve({})

export const penjualanExternalResolver = resolve({})

// Schema for creating new entries
export const penjualanDataSchema = Type.Pick(penjualanSchema, [
  'id_pelanggan', 'id_motor', 'id_user', 'uang_muka', 'tenor'
], {
  $id: 'PenjualanData'
})
export const penjualanDataValidator = getValidator(penjualanDataSchema, dataValidator)
export const penjualanDataResolver = resolve({})

// Schema for updating existing entries
export const penjualanPatchSchema = Type.Partial(penjualanSchema, {
  $id: 'PenjualanPatch'
})
export const penjualanPatchValidator = getValidator(penjualanPatchSchema, dataValidator)
export const penjualanPatchResolver = resolve({})

// Schema for allowed query properties
export const penjualanQueryProperties = Type.Pick(penjualanSchema, [
  'id_penjualan', 'no_kontrak', 'id_pelanggan', 'id_motor', 'id_user', 'uang_muka', 'tenor', 'angsuran'
])
export const penjualanQuerySchema = Type.Intersect(
  [
    querySyntax(penjualanQueryProperties),
    // Add additional query properties here
    Type.Object({
      q: Type.Optional(Type.String())
    }, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const penjualanQueryValidator = getValidator(penjualanQuerySchema, queryValidator)
export const penjualanQueryResolver = resolve({})
