export const rolePath = 'role'

export const roleMethods = ['find', 'get', 'create', 'patch', 'remove']

export const roleClient = client => {
  const connection = client.get('connection')

  client.use(rolePath, connection.service(rolePath), {
    methods: roleMethods
  })
}
