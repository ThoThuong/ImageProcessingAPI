import { Request, Response } from 'express';
import * as uuid from 'uuid';
import Resize from '../helper/resize';

import path from 'path';
import fs from 'fs';

const FILE_PATH = '../../uploads/images_tmp';

const processImage = async (req: Request, res: Response) => {
  const imagePath = path.join(__dirname, FILE_PATH);
  const fileUpload = new Resize(imagePath);

  let { width, height } = req.body;
  if (!width || !height) {
    return res.status(404).json({ error: 'Please provide parameter width and height' });
  }

  width = parseInt(width);

  if (!Number.isInteger(width) && !(width > 0) && !(typeof width === 'number')) {
    return res.status(404).json({ error: 'Please provide the width parameter valid to resize.' });
  }

  height = parseInt(height);

  if (!Number.isInteger(height) && !(height > 0) && !(typeof height === 'number')) {
    return res.status(404).json({ error: 'Please provide the height parameter valid to resize.' });
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
  console.log(filePath, 'ádasdasd')
  const image = fs.createReadStream(filePath);

  const imageResponse = image.pipe(res);
  res.status(201)
  return imageResponse;
};

export { processImage };
