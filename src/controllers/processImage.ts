import { Request, Response } from 'express';
import * as uuid from 'uuid';
import Resize from '../helper/resize';

import path from 'path';
import fs from 'fs';

const FILE_PATH = '../../uploads';

const processImage = async (req: Request, res: Response) => {
  const imagePath = path.join(__dirname, FILE_PATH);
  const fileUpload = new Resize(imagePath);

  let { width, height } = req.body;
  if (!width || !height) {
    return res.status(404).json({ error: 'Please provide parameter width and height' });
  }

  width = parseInt(width);
  height = parseInt(height);

  if (typeof width !== 'number' || typeof height !== 'number') {
    return res.status(404).json({ error: 'Please provide parameter width and height' });
  }

  const ext: string[] = req.file?.mimetype.split('/') ?? [];
  const extImage = ext.length > 1 ? ext[ext.length - 1] : 'png';
  const filename =
    req.file?.originalname ?? (`${uuid.v4}_${extImage}` as string);

  const buffer = req.file?.buffer;
  if (!req.file || !buffer) {
    return res.status(404).json({ error: 'Please provide an image' });
  };

  const filePath = await fileUpload.save(width, height, filename, buffer);
  const image = fs.createReadStream(filePath);

  const imageResponse = image.pipe(res);
  res.status(201)
  return imageResponse;
};

export { processImage };
