import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const FILE_PATH = '../../uploads/images_tmp';

const cleanupDirectory = async (
  _req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const _file_path = path.join(__dirname, FILE_PATH);
  await fs.readdir(_file_path, (err: Error | null, files: string[]) => {
    if (err) throw err;
    for (const file of files) {
      const filePath = path.join(_file_path, file);
      fs.unlink(filePath, (err: Error | null) => {
        if (err) throw err;
      });
    }
  });

  next();
};

export { cleanupDirectory };
