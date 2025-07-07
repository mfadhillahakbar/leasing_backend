import XLSX from 'xlsx';
import dayjs from 'dayjs';
import { BadRequest } from '@feathersjs/errors';

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class ReportService {
  constructor(options, app) {
    this.options = options
    this.app = app
  }

  async find(params) {
    const knex = this.app.get('mssqlClient');
    const { query = {}, res } = params;
    const { start, end } = query;

    if (!res) {
      throw new BadRequest('Export hanya bisa melalui endpoint Express langsung (res diperlukan).');
    }

    const baseQuery = knex('tb_penjualan as p')
      .leftJoin('tb_pelanggan as pel', 'p.id_pelanggan', 'pel.id_pelanggan')
      .leftJoin('tb_motor as m', 'p.id_motor', 'm.id_motor')
      .select(
        'p.no_kontrak',
        'p.created_at as tanggal',
        'pel.nama as nama_pelanggan',
        'pel.no_ktp',
        'pel.no_hp',
        'pel.alamat',
        'm.tipe_motor',
        'm.harga',
        'p.uang_muka',
        'p.tenor',
        'p.angsuran'
      )
      .orderBy('p.created_at', 'desc');

    if (start) {
      baseQuery.where('p.created_at', '>=', dayjs(start).startOf('day').format());
    }
    if (end) {
      baseQuery.where('p.created_at', '<=', dayjs(end).endOf('day').format());
    }

    const rawData = await baseQuery;

    const renamedData = rawData.map((item) => ({
      'No. Kontrak': item.no_kontrak,
      'Tanggal': dayjs(item.tanggal).format('YYYY-MM-DD'),
      'Nama Pelanggan': item.nama_pelanggan,
      'No. KTP': item.no_ktp,
      'Nomor HP': item.no_hp,
      'Alamat': item.alamat,
      'Tipe Motor': item.tipe_motor,
      'Harga Motor': Number(item.harga),
      'Uang Muka': Number(item.uang_muka),
      'Tenor (bulan)': item.tenor,
      'Angsuran / bulan': Number(item.angsuran),
    }));

    const worksheet = XLSX.utils.json_to_sheet(renamedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Laporan Penjualan');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const filename = `laporan-penjualan${start || end ? `-${start || ''}-sd-${end || ''}` : ''}.xlsx`;

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.end(buffer);

    return res;
  }

  async get(id, _params) {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }
  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }

    return {
      id: 0,
      ...data
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id, data, _params) {
    return {
      id: 0,
      ...data
    }
  }

  async patch(id, data, _params) {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data
    }
  }

  async remove(id, _params) {
    return {
      id: 0,
      text: 'removed'
    }
  }
}

export const getOptions = (app) => {
  return { app }
}
