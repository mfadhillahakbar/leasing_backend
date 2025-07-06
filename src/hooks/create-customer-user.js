import { BadRequest } from '@feathersjs/errors';

export const createcustomerUser = () => {
  return async context => {
    const { params, data, app } = context;

    const password = params._tempPassword;
    const { email, nama } = data;

    if (!password) {
      throw new BadRequest('Password wajib diisi untuk membuat akun user.');
    }

    const userService = app.service('user');

    const existing = await userService.find({
      query: { username: email },
      paginate: false
    });

    if (existing.length > 0) {
      throw new BadRequest('Email sudah terdaftar sebagai user.');
    }

    await userService.create({
      username: email,
      password,
      nama,
      id_role: 2
    }, params);

    return context;
  };
};
