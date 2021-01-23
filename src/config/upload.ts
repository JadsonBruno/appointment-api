import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const FILE_DESTINATION = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: FILE_DESTINATION,
    storage: multer.diskStorage({
        destination: FILE_DESTINATION,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
