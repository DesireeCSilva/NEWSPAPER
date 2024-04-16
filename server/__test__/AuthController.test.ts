import request from 'supertest';
import { app, server } from '../app';
import UserModel from "../models/UserModel";
import { UserLogin, adminTest, wrongUser } from "../__test__/test-helpers/helperTest";
import { createToken } from '../utils/jwt';
import connection_db from '../database/connection_db';
import bcrypt from 'bcrypt';

const api = request(app);

describe('Login and Get Users Tests', () => {
    let token: string;

    beforeEach(async () => {
        // Crear un usuario para las pruebas de login
        const hashedPassword = await bcrypt.hash(adminTest.password, 10); 

        // Crear el nuevo usuario con la contraseña encriptada
        const newUserAdmin: any = await UserModel.create({...adminTest, password: hashedPassword });
        // Obtener el token de autenticación para las pruebas de obtención de usuarios
        token = createToken(newUserAdmin);
    });

    afterEach(async () => {
        // Eliminar el usuario creado después de cada prueba
        await UserModel.destroy({ where: { email: UserLogin.email } });
    });

    describe('Login Test', () => {
        test('Login should return 200 status and token', async () => {
            const response = await api.post('/api/auth/login').send(UserLogin);
            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
        });

        test('Login with incorrect credentials should return 401 status', async () => {
            const response = await api.post('/api/auth/login').send(wrongUser);
            expect(response.status).toBe(401);
        });
    });


    afterAll(async () => {
        // Cerrar el servidor y sincronizar la base de datos para limpiar los datos
        server.close();
        await connection_db.sync({ force: true });
        console.log('All databases are clean');
    });
});
