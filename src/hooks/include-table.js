export const includeTable = ({ joinTable, localKey, foreignKey }) => {
  return async context => {
    const { app, service, params } = context;

    const knex = app.get('mssqlClient');
    const baseTable = service.tableName || service.options?.name;

    if (!baseTable) {
      throw new Error('Relasi tabel tidak ditemukan');
    }

    const columns = await knex(joinTable).columnInfo();
    const selectFields = Object.keys(columns).map(col =>
      `${joinTable}.${col} as ${joinTable}_${col}`
    );

    const builder = knex.from(baseTable)
      .leftJoin(joinTable, localKey, foreignKey)
      .select(`${baseTable}.*`, ...selectFields);

    params.knex = builder;

    params._joinAlias = joinTable;
    params._joinFields = Object.keys(columns);

    return context;
  };
};
