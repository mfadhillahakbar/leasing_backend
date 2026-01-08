import { BadRequest } from '@feathersjs/errors';

export const calcInstalment = () => {
  return async (context) => {
    const { data, app } = context;
    const knex = app.get('mssqlClient');

    const { id_motor, uang_muka = 0, tenor = 1 } = data;

    const motor = await knex('tb_motor')
      .select('harga')
      .where('id_motor', id_motor)
      .first();

    if (!motor) {
      throw new BadRequest('Data motor tidak ditemukan');
    }

    const harga_motor = Number(motor.harga);
    const angsuran = Math.ceil((harga_motor - uang_muka) / tenor);

    context.data.angsuran = angsuran;

    return context;
  };
};
