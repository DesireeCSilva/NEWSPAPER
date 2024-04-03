// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import { SECRET_KEY } from '../config';

// // interface AuthenticatedRequest extends Request {
// //     user?: any;
// // }

// export const auth = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if(!token) {
//         return res.status(401).send({ error: 'No authentication token provided.' })
//     };

//     jwt.verify(token, SECRET_KEY, (err) => {
//         if(err) {
//             return res.status(403).send({ error: 'Invalid Token.'})
//         };
//     // req.user = decoded;

//     next();
//     })
// }

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY } from '../config';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //También se podría declarar así: 
    // token = request.headers.authorization.split(' ').pop()

    if (!token) {
        return res.status(401).send({ error: 'No authentication token provided.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded: any) => {
        if (err) {
            return res.status(403).send({ error: 'Invalid Token.' });
        }
        // Almacenar el id y el rol del usuario en res.locals
        res.locals.user = { id: decoded.id, role: decoded.role };
        next();
    })
}
