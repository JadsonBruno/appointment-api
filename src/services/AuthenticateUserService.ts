import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest, AuthResponse } from './index.d';

import authConfig from '../config/auth';

class AuthenticateUserService {
    public async execute({
        email,
        password,
    }: AuthRequest): Promise<AuthResponse> {
        // get user repository instance
        const usersRepository = getRepository(User);

        // search user by email
        const user = await usersRepository.findOne({
            where: { email },
        });

        // user not found: throw Error
        if (user === undefined) {
            throw new Error('Incorrect email/password combination.');
        }

        // user found: compare provided password
        const passwordMatched = await compare(password, user.password);

        // password doesn't match: throw Error
        if (passwordMatched === false) {
            throw new Error('Incorrect email/password combination.');
        }

        // password match: get JWT attributes
        const { expiresIn, secret } = authConfig.jwt;

        // create token
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        // return authenticated user with token
        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
