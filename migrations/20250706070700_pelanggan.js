export async function up(knex) {
  await knex.schema.createTable('tb_pelanggan', table => {
    table.increments('id_pelanggan').primary();
    table.string('no_ktp', 16).notNullable();
    table.string('nama', 50).notNullable();
    table.string('alamat', 30).notNullable();
    table.string('alamat_domisili', 30).notNullable();
    table.string('jenis_kelamin', 10).notNullable();
    table.string('nama_ibu', 50).notNullable();
    table.string('no_hp', 15).notNullable();
    table.string('email', 50).notNullable();
    table.string('pekerjaan', 30).notNullable();
    table.string('upload_ktp').notNullable();
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  })
}

export async function down(knex) {
  await knex.schema.dropTable('tb_pelanggan')
}
