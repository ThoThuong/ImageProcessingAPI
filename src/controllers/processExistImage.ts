import express, { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import fs from 'fs';
import path from 'path';
import Resize from '../helper/resize';

const FILE_PATH = '../uploads';

const processExistImage = async (req: Request, res: Response) => {
    try {
        let pathToGetImageToResize = path.join(__dirname, FILE_PATH);
        const resizeInstance = new Resize(pathToGetImageToResize);

        let { filename, height, width } = req.query;

        if (!width || !height || !filename) {
            return res.status(404).json({ error: 'Please provide parameter width and height and filename' });
        }

        let _width = parseInt(width as string);
        let _height = parseInt(height as string);
        let _filename = String(filename)


        if (typeof _width !== 'number' || typeof _height !== 'number') {
            return res.status(404).json({ error: 'Please provide parameter width and height and filename' });
        }

        pathToGetImageToResize = `${pathToGetImageToResize}/fulls/${_filename}`;
        if (fs.existsSync(pathToGetImageToResize)) {
            const resizedImage = await resizeInstance.resizeExistImage(pathToGetImageToResize, _height, _width);
            const pathToSaveImageFileResized = path.join(__dirname, `../uploads/thumbnails/${_filename}`);
            await fsPromises.writeFile(`${pathToSaveImageFileResized}`, resizedImage);
            res.status(200).sendFile(path.resolve(`${pathToSaveImageFileResized}`));
        } else {
            throw new Error(`Could found any image with file name is ${_filename}`);
        }

    } catch (err: any) {
        res.status(404).send(err);
    }
};

export { processExistImage };