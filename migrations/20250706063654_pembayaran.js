export async function up(knex) {
  await knex.schema.createTable('tb_pembayaran', table => {
    table.increments('id_pembayaran').primary();
    table.integer('id_penjualan').unsigned().notNullable();
    table.integer('cicilan').notNullable().defaultTo(0);
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  })
}

export async function down(knex) {
  await knex.schema.dropTable('tb_pembayaran')
}
