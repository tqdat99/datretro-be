import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../services/auth';
import { IUserInputDTO } from '../interfaces/IUser';
import middleware from '../middleware';
import { celebrate, Joi } from 'celebrate';

export default (app: Router) => {

    app.post(
        '/signup',
        celebrate({
            body: Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
                displayName: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const authServiceInstance = Container.get(AuthService);
                const { user, token } = await authServiceInstance.SignUp(req.body.username, req.body.password, req.body.displayName);
                return res.status(201).json({ user, token });
            } catch (e) {
                return next(e);
            }
        },
    );

    app.post(
        '/signin',
        celebrate({
            body: Joi.object({
                username: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { username } = req.body;
                const authServiceInstance = Container.get(AuthService);
                const { user, token } = await authServiceInstance.SignIn(username);
                return res.json({ user, token }).status(200);
            } catch (e) {
                return next(e);
            }
        },
    );

    /**
     * @TODO Let's leave this as a place holder for now
     * The reason for a logout route could be deleting a 'push notification token'
     * so the device stops receiving push notifications after logout.
     *
     * Another use case for advance/enterprise apps, you can store a record of the jwt token
     * emitted for the session and add it to a black list.
     * It's really annoying to develop that but if you had to, please use Redis as your data store
     */
    app.post('/logout', middleware.isAuth, (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).end();
        } catch (e) {
            // logger.error('🔥 error %o', e);
            return next(e);
        }
    });
};