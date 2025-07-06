export const includeTable = (joinConfigs = []) => {
  return async context => {
    const { app, service, params } = context;

    const knex = app.get('mssqlClient');
    const baseTable = service.tableName || service.options?.name;

    if (!baseTable) {
      throw new Error('Relasi tabel tidak ditemukan');
    }

    let builder = knex.from(baseTable).select(`${baseTable}.*`);
    const allJoinFields = {};

    for (const config of joinConfigs) {
      const { joinTable, localKey, foreignKey } = config;

      const columns = await knex(joinTable).columnInfo();
      const selectFields = Object.keys(columns).map(col =>
        `${joinTable}.${col} as ${joinTable}_${col}`
      );

      builder = builder.leftJoin(joinTable, localKey, foreignKey).select(...selectFields);
      allJoinFields[joinTable] = Object.keys(columns);
    }

    const query = params.query || {};
    Object.entries(query).forEach(([key, value]) => {
      if (!key.startsWith('$')) {
        builder.where(`${baseTable}.${key}`, value);
      }
    });

    params.knex = builder;
    params._joinAlias = Object.keys(allJoinFields);
    params._joinFields = allJoinFields;

    delete params.query;

    return context;
  };
};
