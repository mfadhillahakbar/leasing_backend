export const authenticationPath = 'authentication'

export const authenticationMethods = ['find', 'get', 'create', 'patch', 'remove']

export const authenticationClient = client => {
  const connection = client.get('connection')

  client.use(authenticationPath, connection.service(authenticationPath), {
    methods: authenticationMethods
  })
}
