import { Request, Response } from 'express';
import * as uuid from 'uuid';
import Resize from '../helper/resize';

import path from 'path';
import fs from 'fs';

const FILE_PATH = '../uploads';

const processImage = async (req: Request, res: Response) => {
  const imagePath = path.join(__dirname, FILE_PATH);
  const fileUpload = new Resize(imagePath);

  let { width, height } = req.body;
  width = parseInt(width);
  height = parseInt(height);

  const ext: string[] = req.file?.mimetype.split('/') ?? [];
  const extImage = ext.length > 1 ? ext[ext.length - 1] : 'png';
  const filename =
    req.file?.originalname ?? (`${uuid.v4}_${extImage}` as string);

  const buffer = req.file?.buffer;
  if (!req.file || !buffer) {
    res.status(404).json({ error: 'Please provide an image' });
  }

  const filePath = await fileUpload.save(width, height, filename, buffer);
  const image = fs.createReadStream(filePath);

  return image.pipe(res);
};

export { processImage };
