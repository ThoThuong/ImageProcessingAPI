import { Request, Response } from 'express';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

import Resize from '../helper/resize';

const FILE_PATH = '../../uploads';

const processExistImage = async (req: Request, res: Response) => {
    try {
        let pathToGetImageToResize = path.join(__dirname, FILE_PATH);

        const resizeInstance = new Resize(pathToGetImageToResize);

        const { filename, height, width } = req.query;

        if (!width || !height || !filename) {
            res.status(404).json({ error: 'Please provide parameter width and height and filename' });
            return
        }

        const _width = parseInt(width as string);
        if (!Number.isInteger(_width) || !(_width > 0) || !(typeof _width === 'number')) {
            res.status(404).json({ error: 'Please provide the width parameter valid to resize.' });
            return
        }

        const _height = parseInt(height as string);
        if (!Number.isInteger(_height) || !(_height > 0) || !(typeof _height === 'number')) {
            res.status(404).json({ error: 'Please provide the height parameter valid to resize.' });
            return
        }

        const _filename = String(filename);
        pathToGetImageToResize = `${pathToGetImageToResize}/fulls/${_filename}`;
        if (fs.existsSync(pathToGetImageToResize)) {

            const newFileNameArr = _filename.split('.');
            const ext = newFileNameArr.pop();
            const newFileName = `${newFileNameArr.join('')}x${_width}x${_height}.${ext}`;
            const pathToSaveImageFileResized = path.join(__dirname, `../../uploads/thumbnails/${newFileName}`);

            if (fs.existsSync(pathToSaveImageFileResized)) {
                return res.status(200).sendFile(path.resolve(`${pathToSaveImageFileResized}`));
            } else {
                const resizedImage = await resizeInstance.resizeExistImage(pathToGetImageToResize, _height, _width);
                await fsPromises.writeFile(`${pathToSaveImageFileResized}`, resizedImage);
                return res.status(200).sendFile(path.resolve(`${pathToSaveImageFileResized}`));
            }

        } else {
            throw new Error(`Could not found any image with file name is ${_filename}`);
        }

    } catch (err) {
        res.status(404).send(err);
    }
};

export { processExistImage };