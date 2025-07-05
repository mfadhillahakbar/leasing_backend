// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const authenticationSchema = Type.Object(
  {
    id: Type.Number(),
    username: Type.String(),
    password: Type.Optional(Type.String())
  },
  { $id: 'Authentication', additionalProperties: false }
)
export const authenticationValidator = getValidator(authenticationSchema, dataValidator)
export const authenticationResolver = resolve({})

export const authenticationExternalResolver = resolve({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new entries
export const authenticationDataSchema = Type.Pick(authenticationSchema, ['username', 'password'], {
  $id: 'AuthenticationData'
})
export const authenticationDataValidator = getValidator(authenticationDataSchema, dataValidator)
export const authenticationDataResolver = resolve({
  password: passwordHash({ strategy: 'local' })
})

// Schema for updating existing entries
export const authenticationPatchSchema = Type.Partial(authenticationSchema, {
  $id: 'AuthenticationPatch'
})
export const authenticationPatchValidator = getValidator(authenticationPatchSchema, dataValidator)
export const authenticationPatchResolver = resolve({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const authenticationQueryProperties = Type.Pick(authenticationSchema, ['id', 'username'])
export const authenticationQuerySchema = Type.Intersect(
  [
    querySyntax(authenticationQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const authenticationQueryValidator = getValidator(authenticationQuerySchema, queryValidator)
export const authenticationQueryResolver = resolve({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  id: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user.id
    }

    return value
  }
})
