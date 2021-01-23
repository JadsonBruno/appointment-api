import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// create user router
const usersRouter = Router();

// create multer upload instance
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
    try {
        // get user attributes from request body
        const { name, email, password } = req.body;

        // create user service
        const createUser = new CreateUserService();

        // create user
        const user = await createUser.execute({
            email,
            name,
            password,
        });

        // set property to be removed
        const removeProp = 'password';

        // create resulting created user
        const { [removeProp]: remove, ...result } = user;

        // return created user
        return res.json(result);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (req, res) => {
        try {
            // create avatar service
            const updateUserAvatar = new UpdateUserAvatarService();

            // update user avatar
            const user = await updateUserAvatar.execute({
                user_id: req.user.id,
                avatarFilename: req.file.filename,
            });

            // remove password from updated user
            const userWithoutPassword = {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                created_at: user.created_at,
                updated_at: user.updated_at,
            };

            // return updated user
            return res.json(userWithoutPassword);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },
);

export default usersRouter;
