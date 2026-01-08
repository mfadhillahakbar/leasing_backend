export const motorPath = 'motor'

export const motorMethods = ['find', 'get', 'create', 'patch', 'remove']

export const motorClient = client => {
  const connection = client.get('connection')

  client.use(motorPath, connection.service(motorPath), {
    methods: motorMethods
  })
}
