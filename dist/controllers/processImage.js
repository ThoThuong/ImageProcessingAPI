"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.processImage = void 0;
const uuid = __importStar(require("uuid"));
const resize_1 = __importDefault(require("../helper/resize"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const FILE_PATH = '../../uploads/images_tmp';
const processImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const imagePath = path_1.default.join(__dirname, FILE_PATH);
    const fileUpload = new resize_1.default(imagePath);
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
    const ext = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.mimetype.split('/')) !== null && _b !== void 0 ? _b : [];
    const extImage = ext.length > 1 ? ext[ext.length - 1] : 'png';
    const filename = (_d = (_c = req.file) === null || _c === void 0 ? void 0 : _c.originalname) !== null && _d !== void 0 ? _d : `${uuid.v4}_${extImage}`;
    const buffer = (_e = req.file) === null || _e === void 0 ? void 0 : _e.buffer;
    if (!req.file || !buffer) {
        return res.status(404).json({ error: 'Please provide an image' });
    }
    const filePath = yield fileUpload.save(width, height, filename, buffer);
    console.log(filePath, 'ádasdasd');
    const image = fs_1.default.createReadStream(filePath);
    const imageResponse = image.pipe(res);
    res.status(201);
    return imageResponse;
});
exports.processImage = processImage;
