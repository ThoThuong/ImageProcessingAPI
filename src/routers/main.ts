import express, { Request, Response } from 'express';
import { processImage } from '../controllers/processImage';
import { uploadSingleImage } from '../middleware/uploadImage';
import { cleanupDirectory } from '../middleware/cleanupStorage';
import { processExistImage } from '../controllers/processExistImage';

const router = express.Router();

// router.get('/', (_: Request, res: Response) => {
//   res.json({
//     message: 'Good healthy 🌍',
//   });
// });

router.post('/resize', cleanupDirectory, uploadSingleImage, processImage);
router.get('/', processExistImage);
export default router;
