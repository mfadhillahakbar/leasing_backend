export const pembayaranPath = 'pembayaran'

export const pembayaranMethods = ['find', 'get', 'create', 'patch', 'remove']

export const pembayaranClient = client => {
  const connection = client.get('connection')

  client.use(pembayaranPath, connection.service(pembayaranPath), {
    methods: pembayaranMethods
  })
}
