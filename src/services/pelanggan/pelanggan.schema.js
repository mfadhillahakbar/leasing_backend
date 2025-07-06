// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const pelangganSchema = Type.Object(
  {
    id_pelanggan: Type.Number(),
    no_ktp: Type.String({ maxLength: 16 }),
    nama: Type.String({ maxLength: 50 }),
    alamat: Type.String({ maxLength: 30 }),
    alamat_domisili: Type.String({ maxLength: 30 }),
    jenis_kelamin: Type.String({ maxLength: 10 }),
    nama_ibu: Type.String({ maxLength: 50 }),
    no_hp: Type.String({ maxLength: 15 }),
    email: Type.String({ maxLength: 50 }),
    pekerjaan: Type.String({ maxLength: 30 }),
    upload_ktp: Type.String()
  },
  { $id: 'Pelanggan', additionalProperties: false }
)
export const pelangganValidator = getValidator(pelangganSchema, dataValidator)
export const pelangganResolver = resolve({})

export const pelangganExternalResolver = resolve({})

// Schema for creating new entries
export const pelangganDataSchema = Type.Pick(pelangganSchema, [
  'no_ktp',
  'nama',
  'alamat',
  'alamat_domisili',
  'jenis_kelamin',
  'nama_ibu',
  'no_hp',
  'email',
  'pekerjaan',
  'upload_ktp'
], {
  $id: 'PelangganData'
})
export const pelangganDataValidator = getValidator(pelangganDataSchema, dataValidator)
export const pelangganDataResolver = resolve({})

// Schema for updating existing entries
export const pelangganPatchSchema = Type.Partial(pelangganSchema, {
  $id: 'PelangganPatch'
})
export const pelangganPatchValidator = getValidator(pelangganPatchSchema, dataValidator)
export const pelangganPatchResolver = resolve({})

// Schema for allowed query properties
export const pelangganQueryProperties = Type.Pick(pelangganSchema, ['id_pelanggan', 'nama', 'alamat', 'no_hp', 'email'])
export const pelangganQuerySchema = Type.Intersect(
  [
    querySyntax(pelangganQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const pelangganQueryValidator = getValidator(pelangganQuerySchema, queryValidator)
export const pelangganQueryResolver = resolve({})
