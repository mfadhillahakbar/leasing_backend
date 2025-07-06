// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const roleSchema = Type.Object(
  {
    id: Type.Number(),
    nama: Type.String({ maxLength: 20 })
  },
  { $id: 'Role', additionalProperties: false }
)
export const roleValidator = getValidator(roleSchema, dataValidator)
export const roleResolver = resolve({})

export const roleExternalResolver = resolve({})

// Schema for creating new entries
export const roleDataSchema = Type.Pick(roleSchema, ['nama'], {
  $id: 'RoleData'
})
export const roleDataValidator = getValidator(roleDataSchema, dataValidator)
export const roleDataResolver = resolve({})

// Schema for updating existing entries
export const rolePatchSchema = Type.Partial(roleSchema, {
  $id: 'RolePatch'
})
export const rolePatchValidator = getValidator(rolePatchSchema, dataValidator)
export const rolePatchResolver = resolve({})

// Schema for allowed query properties
export const roleQueryProperties = Type.Pick(roleSchema, ['id', 'nama'])
export const roleQuerySchema = Type.Intersect(
  [
    querySyntax(roleQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const roleQueryValidator = getValidator(roleQuerySchema, queryValidator)
export const roleQueryResolver = resolve({})
