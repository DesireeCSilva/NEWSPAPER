import { Request, Response, NextFunction, RequestHandler } from 'express';
import { check, ValidationChain } from 'express-validator';
import { validateResult } from '../helpers/validateHelper';


const validateResultMiddleware: RequestHandler = (req, res, next) => {
    validateResult(req, res, next);
};


export const validatePost: RequestHandler[] = [
    check('title')
        .exists()
        .notEmpty(),
    
    check('content')
        .exists()
        .notEmpty(),
    
    check('date')
        .exists()
        .notEmpty(),
    
    check('image')
        .exists()
        .notEmpty(), 
        
    validateResultMiddleware
];