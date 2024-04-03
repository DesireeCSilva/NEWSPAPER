import { check, validationResult } from 'express-validator';
import UserModel from '../models/UserModel';
import { Request, Response, NextFunction, RequestHandler } from 'express';


const isEmailNotInUse = async (email: string): Promise<boolean> => {
    const user = await UserModel.findOne({ where: { email } });
    return !user;
};


export const validateCreateUser: RequestHandler[] = [
    check('name')
        .exists()
        .withMessage('Name is required')
        .notEmpty()
        .withMessage('Name cannot be empty'),

    check('email')
        .exists()
        .withMessage('Email is required')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Email is not valid')
        .custom(async (value) => {
            const isInUse = await isEmailNotInUse(value);
            if (!isInUse) {
                throw new Error('Email is already in use');
            }
            return true;
        }),

    check('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),

    check('role')
        .exists()
        .withMessage('Role is required')
        .notEmpty()
        .withMessage('Role cannot be empty')
        .isIn(['user', 'admin'])
        .withMessage('Role must be "user" or "admin"'),

    
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];
