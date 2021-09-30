import Joi from 'joi';
import { IUser } from '../models/User';


export const createUserValidation = (data: IUser) => {
    const userSchema = Joi.object({
        userId: Joi
            .number()
            .required(),
        name: Joi
            .string()
            .min(4)
            .required(),
        email: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .min(6)
            .required(),
        username: Joi
            .string()
            .min(4)
            .required(),


    });
    return userSchema.validate(data);
};

export const loginValidation = (data: IUser) => {
    const userSchema = Joi.object({
        email: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .min(6)
            .required()
    });
    return userSchema.validate(data);
};