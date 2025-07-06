export async function up(knex) {
  await knex.schema.createTable('tb_penjualan', table => {
    table.increments('id_penjualan').primary();
    table.string('no_kontrak', 10);
    table.integer('id_pelanggan').unsigned();
    table.integer('id_motor').unsigned();
    table.integer('id_user').unsigned();
    table.decimal('uang_muka', 20, 2).defaultTo(0);
    table.integer('tenor').defaultTo(0);
    table.decimal('angsuran', 20, 2).defaultTo(0);
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  })
}

export async function down(knex) {
  await knex.schema.dropTable('tb_penjualan')
}
