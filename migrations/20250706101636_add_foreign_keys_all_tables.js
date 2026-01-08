export async function up(knex) {
  await knex.schema.alterTable('user', table => {
    table.integer('id_role').unsigned().alter();
    table.foreign('id_role').references('id').inTable('role').onDelete('CASCADE');
  });

  await knex.schema.alterTable('tb_penjualan', table => {
    table.integer('id_pelanggan').unsigned().alter();
    table.foreign('id_pelanggan').references('id_pelanggan').inTable('tb_pelanggan').onDelete('CASCADE');
  });

  await knex.schema.alterTable('tb_penjualan', table => {
    table.integer('id_motor').unsigned().alter();
    table.foreign('id_motor').references('id_motor').inTable('tb_motor').onDelete('CASCADE');
  });

  await knex.schema.alterTable('tb_penjualan', table => {
    table.integer('id_user').unsigned().alter();
    table.foreign('id_user').references('id').inTable('user').onDelete('CASCADE');
  });

  await knex.schema.alterTable('tb_pembayaran', table => {
    table.integer('id_penjualan').unsigned().alter();
    table.foreign('id_penjualan').references('id_penjualan').inTable('tb_penjualan').onDelete('CASCADE');
  });
}

export async function down(knex) {
  await knex.schema.alterTable('tb_pembayaran', table => {
    table.dropForeign(['id_penjualan']);
  });

  await knex.schema.alterTable('tb_penjualan', table => {
    table.dropForeign(['id_pembayaran']);
    table.dropForeign(['id_user']);
    table.dropForeign(['id_motor']);
    table.dropForeign(['id_pelanggan']);
  });

  await knex.schema.alterTable('user', table => {
    table.dropForeign(['id_role']);
  });
}