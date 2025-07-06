import fs from 'fs/promises'
import path from 'path'
import { BadRequest } from '@feathersjs/errors'

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class UploadService {
  constructor(options) {
    this.options = options
  }

  async find(_params) {
    return []
  }

  async get(id, _params) {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }
  async create(data, params) {
    const { PUBLIC_URL: url } = process.env;
    const req = params.__req;
    const file = req?.file;

    if (!file) {
      throw new BadRequest('Tidak ada file yang diunggah');
    }

    const uploadDir = path.join(process.cwd(), 'public');
    await fs.mkdir(uploadDir, { recursive: true });

    const timestamp = Date.now();
    const filename = file.originalname.toLowerCase().replace(/\s+/g, '-');
    const formatFilename = `${timestamp}-${filename}`;

    const filePath = path.join(uploadDir, formatFilename);
    await fs.writeFile(filePath, file.buffer);

    return {
      success: true,
      filename: formatFilename,
      size: file.size,
      mimetype: file.mimetype,
      url: `${url}/public/${formatFilename}`
    };
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id, data, _params) {
    return {
      id: 0,
      ...data
    }
  }

  async patch(id, data, _params) {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data
    }
  }

  async remove(id, _params) {
    return {
      id: 0,
      text: 'removed'
    }
  }
}

export const getOptions = app => {
  return { app }
}
