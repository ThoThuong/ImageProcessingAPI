"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const path_1 = __importDefault(require("path"));
const supertest_1 = __importDefault(require("supertest"));
const form_data_1 = __importDefault(require("form-data"));
const resize_1 = __importDefault(require("../helper/resize"));
const index_1 = __importDefault(require("../index"));
const form = new form_data_1.default();
const FILE_PATH = '../tests';
describe('Resize', () => {
    let rs;
    let folderPath = '/Users/tranngocthuong/projects/ImageProcessingAPI/src/uploads/';
    let request = (0, supertest_1.default)(index_1.default);
    beforeAll(() => {
        rs = new resize_1.default(folderPath);
    });
    // it('save', async () => {
    //   let width = 1000;
    //   let height = 1000;
    //   let fileName = 'testing-result.jpeg';
    //   let buff = fs.readFileSync('src/tests/testing-image.jpeg');
    //   const filePathAfterResize = await rs.save(width, height, fileName, buff);
    //   expect(filePathAfterResize).toEqual(`${path.join(__dirname, FILE_PATH)}/${fileName}`);
    // });
    // it('filepath', () => {
    //   const fileName = 'testing-result.jpeg';
    //   const filePath = rs.filepath(fileName);
    //   expect(filePath).toEqual(`${folderPath}${fileName}`);
    // });
    it('Resize valid request', () => __awaiter(void 0, void 0, void 0, function* () {
        let fileName = 'testing-image.jpeg';
        const filePath = `${path_1.default.join(__dirname, FILE_PATH)}/${fileName}`;
        request.post('/resize')
            .set('Content-Type', 'multipart/form-data;')
            .field('width', 500)
            .field('height', 400)
            .attach('image', filePath)
            .expect(201);
    }));
    it('Resize invalid request: missing image file', () => __awaiter(void 0, void 0, void 0, function* () {
        request.post('/resize')
            .set('Content-Type', 'multipart/form-data;')
            .field('width', 500)
            .field('height', 400)
            .expect(404);
    }));
    it('Resize invalid request: missing width info and image file to resize', () => __awaiter(void 0, void 0, void 0, function* () {
        request.post('/resize')
            .set('Content-Type', 'multipart/form-data;')
            .field('height', 400)
            .expect(404);
    }));
    it('Resize invalid request: missing height info and image file to resize', () => __awaiter(void 0, void 0, void 0, function* () {
        request.post('/resize')
            .set('Content-Type', 'multipart/form-data;')
            .field('width', 400)
            .expect(404);
    }));
});
