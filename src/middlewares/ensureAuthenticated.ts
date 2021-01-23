import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import { TokenPayload } from './ensureAuthenticated.d';

export default function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    // get authorization info from headers
    const authHeader = req.headers.authorization;

    // header not provided: throw error
    if (authHeader === undefined) {
        throw new Error('JWT token is missing');
    }

    // header provided: get token from it
    const [, token] = authHeader.split(' ');

    try {
        // verifiy whether is a valid token or not
        const decoded = verify(token, authConfig.jwt.secret);

        // get sub from decoded token
        const { sub } = decoded as TokenPayload;

        // set user id as sub
        request.user = {
            id: sub,
        };

        // call next middleware
        return next();
    } catch {
        throw new Error('Invalid JWT token');
    }
}
