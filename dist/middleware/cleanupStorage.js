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
exports.cleanupDirectory = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FILE_PATH = 'src/uploads';
const cleanupDirectory = (_req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_1.default.readdir(FILE_PATH, (err, files) => {
        if (err)
            throw err;
        for (const file of files) {
            const filePath = path_1.default.join(FILE_PATH, file);
            fs_1.default.unlink(filePath, (err) => {
                if (err)
                    throw err;
            });
        }
    });
    next();
});
exports.cleanupDirectory = cleanupDirectory;
