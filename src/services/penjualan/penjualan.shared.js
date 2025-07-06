export const penjualanPath = 'penjualan'

export const penjualanMethods = ['find', 'get', 'create', 'remove']

export const penjualanClient = client => {
  const connection = client.get('connection')

  client.use(penjualanPath, connection.service(penjualanPath), {
    methods: penjualanMethods
  })
}
