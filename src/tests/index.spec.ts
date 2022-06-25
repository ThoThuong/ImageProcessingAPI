import "jasmine";

// class
import { TestUniTest } from './../helper/test';
import Resize from '../helper/resize'; 

// function
import { processImage } from '../controllers/processImage';
import { cleanupDirectory } from '../middleware/cleanupStorage';
import { uploadSingleImage } from '../middleware/uploadImage';
import { readFileSync } from "fs";
import { buffer } from "stream/consumers";

describe("TestUniTest", () => {
  let o: TestUniTest;

  beforeEach(() => {
    o = new TestUniTest();
  });

  it("sync", () => {
    expect(o.sync()).toEqual("sync");
  });

  it("asyncCallback", (done) => {
    o.asyncCallback((value) => {
      expect(value).toEqual("asyncCallback");
      done();
    });
  });

  it("asyncPromise", async () => {
    const value = await o.asyncPromise();
    expect(value).toEqual("asyncPromise");
  });

  it("plus", () => {
    const a = 1;
    const b = 2;
    const plus = a + b;
    expect(plus).toEqual(3)
  });
});

describe('Resize', () => { 
  console.log('Stating => Resize ...');

  let rs: Resize;
  let folderPath = '/Users/tranngocthuong/projects/ImageProcessingAPI/src/uploads/'; 

  beforeEach(() => {
    rs = new Resize(folderPath);
  });

  it('save', async() => {
    let width = 1000;
    let height = 1000;
    let fileName = '12312312.jpeg'
    let buffer = Buffer.from(`data:image/jpeg;base64, 312312321312312.jpeg`);

    const filePathAfterResize = await rs.save(width, height, fileName, buffer);
    expect(filePathAfterResize).toEqual("asyncPromise");
  });

  it('filepath', () => {

  });

})

// describe('processImage', () => { 
//   console.log('processImage');
  
//   it('placeholder', () => {

//   })
// });

// describe('cleanupDirectory', () => { 
//   console.log('cleanupDirectory');
//   it('placeholder', () => {

//   })

// })

// describe('uploadSingleImage', () => { 
//   console.log('uploadSingleImage');
//   it('placeholder', () => {

//   })
// })