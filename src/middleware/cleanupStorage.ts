import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const FILE_PATH = 'src/uploads';

const cleanupDirectory = async (
  _req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  await fs.readdir(FILE_PATH, (err: Error | null, files: string[]) => {
    if (err) throw err;
    for (const file of files) {
      const filePath = path.join(FILE_PATH, file);
      fs.unlink(filePath, (err: Error | null) => {
        if (err) throw err;
      });
    }
  });

  next();
};

export default cleanupDirectory;
