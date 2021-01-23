import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

// create session router
const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
    try {
        // get session attributes from request body
        const { email, password } = req.body;

        // get authenticate service instance
        const authenticateUserService = new AuthenticateUserService();

        // authenticate user
        const { user, token } = await authenticateUserService.execute({
            email,
            password,
        });

        // set property to be removed
        const removeProp = 'password';

        // create resulting object
        const { [removeProp]: remove, ...result } = user;

        // return authenticated user and token
        return res.json({ result, token });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
