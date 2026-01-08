import dayjs from 'dayjs';

export const generatePrefixOrder = () => {
  return async (context) => {
    const { app } = context;
    const knex = app.get('mssqlClient');

    const today = dayjs();
    const yy = today.format('YY');
    const mm = today.format('MM');
    const prefix = `PK${yy}${mm}`;

    const last = await knex('tb_penjualan')
      .whereRaw(`FORMAT(created_at, 'yyyyMM') = ?`, [today.format('YYYYMM')])
      .where('no_kontrak', 'like', `${prefix}%`)
      .orderBy('id_penjualan', 'desc')
      .first();

    let nextNumber = 1;
    if (last && last.no_kontrak) {
      const match = last.no_kontrak.match(/(\d{4})$/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }

    const no_kontrak = `${prefix}${String(nextNumber).padStart(4, '0')}`;

    if (no_kontrak.length > 10) {
      throw new Error(`no_kontrak melebihi batas 10 karakter: ${no_kontrak}`);
    }

    context.data.no_kontrak = no_kontrak;

    return context;
  };
};
