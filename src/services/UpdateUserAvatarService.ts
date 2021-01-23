import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import User from '../models/User';
import { UpdateAvatarRequest } from './index.d';

class UpdateUserAvatarService {
    public async execute({
        user_id,
        avatarFilename,
    }: UpdateAvatarRequest): Promise<User> {
        // get user repository service
        const usersRepository = getRepository(User);

        // search user with provided ID
        const user = await usersRepository.findOne(user_id);

        // user not found: throw error
        if (user === undefined) {
            throw new Error('Only authenticated users can change avatar.');
        }

        // user found and has avatar: remove current avatar file
        if (user.avatar) {
            // get current user avatar file path
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );

            // search whether avatar file exists or not
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            // avatar file exists: remove it
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        // set user avatar as provided avatar filename
        user.avatar = avatarFilename;

        // update user with new avatar
        await usersRepository.save(user);

        // return updated user
        return user;
    }
}

export default UpdateUserAvatarService;
