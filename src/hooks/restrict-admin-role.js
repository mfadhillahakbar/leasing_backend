import { Forbidden } from '@feathersjs/errors';

export const restrictAdminRole = () => {
  return async context => {
    const { params } = context;

    if (!params.provider || !params.user) {
      return context;
    }

    const { user } = params;

    if (!user.role || user.role.nama !== 'Admin') {
      throw new Forbidden('Hanya admin yang dapat mengakses metode ini');
    }

    return context;
  };
};