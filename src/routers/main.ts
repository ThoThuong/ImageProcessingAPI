import express, { Request, Response } from 'express';
import { processImage } from '../controllers/processImage';
import { uploadSingleImage } from '../middleware/uploadImage';
import { cleanupDirectory } from '../middleware/cleanupStorage';

const router = express.Router();

// router.get('/', (_: Request, res: Response) => {
//   res.json({
//     message: 'Good healthy 🌍',
//   });
// });

router.get('/resize', cleanupDirectory, uploadSingleImage, processImage);

export default router;
