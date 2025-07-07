import { BadRequest, NotFound } from '@feathersjs/errors';

export const decrementMotorStock = () => {
  return async (context) => {
    const { app, data } = context;

    if (!data || !data.id_motor) {
      throw new BadRequest('Data penjualan tidak valid.');
    }

    const knex = app.get('mssqlClient');

    const motor = await knex('tb_motor')
      .where('id_motor', data.id_motor)
      .first();

    if (!motor) {
      throw new NotFound('Data motor tidak ditemukan.');
    }

    if (motor.jumlah_stok < 1) {
      throw new BadRequest('Stok motor habis. Tidak bisa melakukan transaksi.');
    }

    await knex('tb_motor')
      .where('id_motor', data.id_motor)
      .decrement('jumlah_stok', 1);

    return context;
  };
};