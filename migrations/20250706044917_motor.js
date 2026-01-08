export async function up(knex) {
  await knex.schema.createTable('tb_motor', table => {
    table.increments('id_motor').primary();
    table.string('tipe_motor', 30);
    table.decimal('harga', 20, 2).defaultTo(0);
    table.integer('jumlah_stok').defaultTo(0);
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  })
}

export async function down(knex) {
  await knex.schema.dropTable('tb_motor')
}
