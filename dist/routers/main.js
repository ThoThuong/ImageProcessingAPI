"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const processImage_1 = __importDefault(require("../controllers/processImage"));
const uploadImage_1 = require("../middleware/uploadImage");
const cleanupStorage_1 = __importDefault(require("../middleware/cleanupStorage"));
const router = express_1.default.Router();
router.get('/', (_, res) => {
    res.json({
        message: 'Good healthy 🌍',
    });
});
router.post('/resize', cleanupStorage_1.default, uploadImage_1.uploadSingleImage, processImage_1.default);
exports.default = router;
