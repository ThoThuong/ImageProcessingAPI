import express from 'express';

import { processExistImage } from '../controllers/processExistImage';
import { processImage } from '../controllers/processImage';
import { cleanupDirectory } from '../middleware/cleanupStorage';
import { uploadSingleImage } from '../middleware/uploadImage';

const router = express.Router();

// router.get('/', (_: Request, res: Response) => {
//   res.json({
//     message: 'Good healthy 🌍',
//   });
// });

router.post('/resize', cleanupDirectory, uploadSingleImage, processImage);
router.get('/', processExistImage);
export default router;
