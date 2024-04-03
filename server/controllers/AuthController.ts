import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import { Request, Response } from 'express';
import { SECRET_KEY } from '../config';

//REGISTER
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: any = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: newUser.id, role: newUser.role }, SECRET_KEY, { expiresIn: '24h' });

        // Enviar el nuevo usuario y el token en la respuesta
        res.status(201).json({ user: newUser, token });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

//LOGIN
export const loginUser = async (req: Request, res: Response) => {
    try {
        const user: any = await UserModel.findOne({ where: {email: req.body.email} }); //El any luego hay que tiparlo
        
        if(!user) {
            return res.status(404).send({ error: "USER_NOT_FOUND" })
        }

        const checkPassword = await bcrypt.compare(req.body.password, user.password);

        if(!checkPassword) {
            return res.status(401).send( {error: 'INVALID_PASSWORD'});
        }

        const token = jwt.sign({userId: user.id, role: user.role}, SECRET_KEY, {expiresIn: '24h'});

        res.status(200).send({ 
            message: 'USER_LOGIN_SUCCESSFULLY', 
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            tokenUser: token});
    
    } catch(error: any) {
        
        return res.status(500).send({ error: 'Internal server error'});
    }
}