import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

export const  createToken = async (user:any) => {
    const  token = jwt.sign(
        {
            id: user.id,
            rol: user.rol
        },
        SECRET_KEY ,{ expiresIn: "2h"})
        return token;
}