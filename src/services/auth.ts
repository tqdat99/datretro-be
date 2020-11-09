import { Service, Inject } from 'typedi';
import config from '../config';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import UserModel from "./../models/user";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken'

@Service()
export default class AuthService {

    public async SignUp(username: string, password: string, displayName: string): Promise<{ user: IUser; token: string }> {
        try {
            const doc = new UserModel({ username: username, password: password, displayName: displayName });
            //console.log(doc);

            //const data = { username, password, displayName };

            const userRecord = await UserModel.create(doc);

            const isDuplicatedUser = await UserModel.findOne({ username });
            if (!isDuplicatedUser) {
                throw new Error('Username already registered.');
            }

            const token = this.generateToken(userRecord);

            /**
             * @TODO This is not the best way to deal with this
             * There should exist a 'Mapper' layer
             * that transforms data from layer to layer
             * but that's too over-engineering for now
             */
            const user = userRecord.toObject();

            return { user, token };
        } catch (e) {
            throw e;
        }
    }

    public async SignIn(username: string): Promise<{ user: IUser; token: string }> {
        const userRecord = await UserModel.findOne({ username });

        const token = this.generateToken(userRecord);

        const user = userRecord.toObject();

        return { user, token };

    }

    private generateToken(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        /**
         * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
         * The cool thing is that you can add custom properties a.k.a metadata
         * Here we are adding the userId, role and name
         * Beware that the metadata is public and can be decoded without _the secret_
         * but the client cannot craft a JWT to fake a userId
         * because it doesn't have _the secret_ to sign it
         * more information here: https://softwareontheroad.com/you-dont-need-passport
         */
        return jwt.sign(
            {
                _id: user._id, // We are gonna use this in the middleware 'isAuth'
                role: user.role,
                name: user.name,
                exp: exp.getTime() / 1000,
            },
            config.jwtSecret,
        );
    }
}