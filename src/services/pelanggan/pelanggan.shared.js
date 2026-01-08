export const pelangganPath = 'pelanggan'

export const pelangganMethods = ['find', 'get', 'create', 'patch', 'remove']

export const pelangganClient = client => {
  const connection = client.get('connection')

  client.use(pelangganPath, connection.service(pelangganPath), {
    methods: pelangganMethods
  })
}
