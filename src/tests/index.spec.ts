import 'jasmine';

import fs from 'fs';
import path from 'path';
import supertest from 'supertest';

import app from '..';
import Resize from '../helper/resize';

const FILE_PATH = '../tests';

describe('Resize', () => {
  let rs: Resize;
  let folderPath = '/Users/tranngocthuong/projects/ImageProcessingAPI/src/uploads/';
  let request = supertest(app);

  beforeAll(() => {
    rs = new Resize(folderPath);
  });

  it('save', async () => {
    let width = 1000;
    let height = 1000;
    let fileName = 'testing-result.jpeg';
    let buff = fs.readFileSync('src/tests/testing-image.jpeg');
    const filePathAfterResize = await rs.save(width, height, fileName, buff);
    expect(filePathAfterResize).toEqual(`${path.join(__dirname, FILE_PATH)}/${fileName}`);
  });

  it('filepath', () => {
    const fileName = 'testing-result.jpeg';
    const filePath = rs.filepath(fileName);
    expect(filePath).toEqual(`${folderPath}${fileName}`);
  });


  it('Resize valid request', async () => {
    let fileName = 'testing-image.jpeg';
    const filePath = `${path.join(__dirname, FILE_PATH)}/${fileName}`;

    request.post('/resize')
      .set('Content-Type', 'multipart/form-data;')
      .field('width', 500)
      .field('height', 400)
      .attach('image', filePath)
      .expect(201);

  });

  it('Resize invalid request: missing image file', async () => {
    request.post('/resize')
      .set('Content-Type', 'multipart/form-data;')
      .field('width', 500)
      .field('height', 400)
      .expect(404);

  });


  it('Resize invalid request: missing width info and image file to resize', async () => {
    request.post('/resize')
      .set('Content-Type', 'multipart/form-data;')
      .field('height', 400)
      .expect(404);
  });

  it('Resize invalid request: missing height info and image file to resize', async () => {
    request.post('/resize')
      .set('Content-Type', 'multipart/form-data;')
      .field('width', 400)
      .expect(404);
  });

});


