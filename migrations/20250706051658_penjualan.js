export async function up(knex) {
  await knex.schema.createTable('tb_penjualan', table => {
    table.increments('id_penjualan').primary();
    table.string('no_kontrak', 10).notNullable();
    table.string('id_pelanggan', 10).notNullable();
    table.integer('id_motor').unsigned().notNullable();
    table.integer('id_user').unsigned().notNullable();
    table.string('uang_muka', 20).notNullable();
    table.string('tenor', 20).notNullable();
    table.string('angsuran', 20).notNullable();
    table.integer('id_pembayaran').unsigned().nullable();
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  })
}

export async function down(knex) {
  await knex.schema.dropTable('tb_penjualan')
}
