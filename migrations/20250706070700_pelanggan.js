export async function up(knex) {
  await knex.schema.createTable('tb_pelanggan', table => {
    table.increments('id_pelanggan').primary();
    table.string('no_ktp', 16);
    table.string('nama', 50);
    table.string('alamat', 30);
    table.string('alamat_domisili', 30);
    table.string('jenis_kelamin', 10);
    table.string('nama_ibu', 50);
    table.string('no_hp', 15);
    table.string('email', 50);
    table.string('pekerjaan', 30);
    table.string('upload_ktp', 100);
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  })
}

export async function down(knex) {
  await knex.schema.dropTable('tb_pelanggan')
}
