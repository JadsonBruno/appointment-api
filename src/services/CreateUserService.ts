import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';
import { UserRequest } from './index.d';

class CreateUserService {
    public async execute({
        email,
        name,
        password,
    }: UserRequest): Promise<User> {
        // get user repository
        const usersRepository = getRepository(User);

        // try find user with current email
        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        // email already used: throw error
        if (checkUserExists !== undefined) {
            throw new Error('Email address already used.');
        }

        // email not used: encrypt password
        const hashedPassword = await hash(password, 8);

        // create new user
        const user = usersRepository.create({
            email,
            name,
            password: hashedPassword,
        });

        // save user at database
        await usersRepository.save(user);

        // return created user
        return user;
    }
}

export default CreateUserService;
