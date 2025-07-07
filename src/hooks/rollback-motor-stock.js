export const rollbackMotorStock = () => {
  return async (context) => {
    const { app, params, data } = context;

    if (params._decrementedStock && data?.id_motor) {
      const knex = app.get('mssqlClient');

      await knex('tb_motor')
        .where('id_motor', data.id_motor)
        .increment('jumlah_stok', 1);
    }

    return context;
  };
};