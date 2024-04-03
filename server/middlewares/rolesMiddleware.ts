import { Request, Response, NextFunction, RequestHandler } from 'express';


export const checkRole = (...roles: string[]): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (roles.includes(req.user.role)) {
          next(); // Si el rol del usuario está permitido, continua con el siguiente middleware o controlador
        } else {
          res.status(403).json({ message: 'Forbidden' }); // Si el rol del usuario no está permitido, envía un error 403
        }
    };
};