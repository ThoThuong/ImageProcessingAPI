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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = void 0;
var uuid = __importStar(require("uuid"));
var resize_1 = __importDefault(require("../helper/resize"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var FILE_PATH = '../../uploads/images_tmp';
var processImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imagePath, fileUpload, _a, width, height, ext, extImage, filename, buffer, filePath, image, imageResponse;
    var _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                imagePath = path_1.default.join(__dirname, FILE_PATH);
                fileUpload = new resize_1.default(imagePath);
                _a = req.body, width = _a.width, height = _a.height;
                if (!width || !height) {
                    return [2 /*return*/, res.status(404).json({ error: 'Please provide parameter width and height' })];
                }
                width = parseInt(width);
                if (!Number.isInteger(width) && !(width > 0) && !(typeof width === 'number')) {
                    return [2 /*return*/, res.status(404).json({ error: 'Please provide the width parameter valid to resize.' })];
                }
                height = parseInt(height);
                if (!Number.isInteger(height) && !(height > 0) && !(typeof height === 'number')) {
                    return [2 /*return*/, res.status(404).json({ error: 'Please provide the height parameter valid to resize.' })];
                }
                ext = (_c = (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype.split('/')) !== null && _c !== void 0 ? _c : [];
                extImage = ext.length > 1 ? ext[ext.length - 1] : 'png';
                filename = (_e = (_d = req.file) === null || _d === void 0 ? void 0 : _d.originalname) !== null && _e !== void 0 ? _e : "".concat(uuid.v4, "_").concat(extImage);
                buffer = (_f = req.file) === null || _f === void 0 ? void 0 : _f.buffer;
                if (!req.file || !buffer) {
                    return [2 /*return*/, res.status(404).json({ error: 'Please provide an image' })];
                }
                return [4 /*yield*/, fileUpload.save(width, height, filename, buffer)];
            case 1:
                filePath = _g.sent();
                console.log(filePath, 'ádasdasd');
                image = fs_1.default.createReadStream(filePath);
                imageResponse = image.pipe(res);
                res.status(201);
                return [2 /*return*/, imageResponse];
        }
    });
}); };
exports.processImage = processImage;
