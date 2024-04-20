



import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class AuthRoutes {


  static get routes(): Router {
    const router = Router();

    const database = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(database)

    const controller = new AuthController(authRepository);

    /**
     * @swagger
     * components:
     *   schemas:
     *     User:
     *       type: object
     *       properties:
     *         token:
     *           type: string
     *           description: JWT token
     *         user:
     *           type: object
     *           properties:
     *             id:
     *               type: string
     *               description: Unique identifier for the user
     *             name:
     *               type: string
     *               description: Name of the user
     *             email:
     *               type: string
     *               description: Email of the user
     *       example:
     *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkYjM5NDUyLWM5ZDctNDRkZC1hYmEwLWQyMTFhOTgwMDEzMiIsImlhdCI6MTcxMzYyMjkxNCwiZXhwIjoxNzEzNjMwMTE0fQ.4QBOJOOHeEToZEZuvSSkHdbjP7bkI7qMeBnNvWlWGNs
     *         user:
     *           id: adb39452-c9d7-44dd-aba0-d211a9855555
     *           name: John Doe
     *           email: john@example.com
     *     LoginRequest:
     *       type: object
     *       required:
     *         - email
     *         - password
     *       properties:
     *         email:
     *           type: string
     *           description: Email of the user
     *         password:
     *           type: string
     *           description: Password of the user
     */

    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Login user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginRequest'
     *     responses:
     *       200:
     *         description: User logged in successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Invalid credentials
     */
    router.post('/login', controller.loginUser)
    router.post('/register', controller.registerUser)
    router.put('/update', controller.updateUser)
    router.delete('/:id', controller.deleteUser)

    // router.get('/', [AuthMiddleware.validateJWT], controller.getUsers)


    return router;
  }
}
