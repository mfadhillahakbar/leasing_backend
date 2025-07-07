export const handleSearch = (fields = []) => {
  return async context => {
    const { params } = context;
    const { query = {} } = params;
    const searchValue = query.q;

    if (!searchValue) return context;

    const knex = context.app.get('mssqlClient');
    const builder = params.knex || knex(context.path);

    builder.where(function () {
      for (const field of fields) {
        this.orWhereRaw(`LOWER(${field}) LIKE ?`, [`%${searchValue.toLowerCase()}%`]);
      }
    });

    delete params.query.q;

    return context;
  };
};
