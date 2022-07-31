"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const processImage_1 = require("../controllers/processImage");
const uploadImage_1 = require("../middleware/uploadImage");
const cleanupStorage_1 = require("../middleware/cleanupStorage");
const router = express_1.default.Router();
// router.get('/', (_: Request, res: Response) => {
//   res.json({
//     message: 'Good healthy 🌍',
//   });
// });
router.get('/resize', cleanupStorage_1.cleanupDirectory, uploadImage_1.uploadSingleImage, processImage_1.processImage);
exports.default = router;
