import multer from 'multer';

const storage = multer.memoryStorage();
const uploadSingleImage = multer({ storage: storage }).single('image');

export { uploadSingleImage };
