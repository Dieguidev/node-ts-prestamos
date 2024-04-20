



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
     *   securitySchemes:
     *     bearerAuth:
     *       type: http
     *       scheme: bearer
     *       bearerFormat: JWT
     *   schemas:
     *     User:
     *       type: object
     *       properties:
     *         token:
     *           type: string
     *           description: JWT token
     *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkYjM5NDUyLWM5ZDctNDRkZC1hYmEwLWQyMTFhOTgwMDEzMiIsImlhdCI6MTcxMzYyMjkxNCwiZXhwIjoxNzEzNjMwMTE0fQ.4QBOJOOHeEToZEZuvSSkHdbjP7bkI7qMeBnNvWlWGNs
     *         user:
     *           type: object
     *           properties:
     *             id:
     *               type: string
     *               description: Unique identifier for the user
     *               example: adb39452-c9d7-44dd-aba0-d211a9855555
     *             name:
     *               type: string
     *               description: Name of the user
     *               example: John
     *             email:
     *               type: string
     *               description: Email of the user
     *               example: john@example.com
     *
     *     GetAllUsers:
     *       type: object
     *       properties:
     *         user:
     *           type: object
     *           properties:
     *             id:
     *               type: string
     *               description: Unique identifier for the user
     *               example: adb39452-c9d7-44dd-aba0-d211a9855555
     *             name:
     *               type: string
     *               description: Name of the user
     *               example: John
     *             email:
     *               type: string
     *               description: Email of the user
     *               example: john@example.com
     *
     *     RegisterRequest:
     *       type: object
     *       required:
     *         - email
     *         - password
     *         - name
     *         - lastName
     *         - dni
     *       properties:
     *         email:
     *           type: string
     *           description: Email of the user
     *           example: john@example.com
     *         password:
     *           type: string
     *           description: Password of the user
     *           example: password123
     *         name:
     *           type: string
     *           description: Name of the user
     *           example: John
     *         lastName:
     *           type: string
     *           description: Last Name of the user
     *           example: Doe
     *         dni:
     *           type: string
     *           description: DNI of the user
     *           example: 12345678
     *         phone:
     *           type: string
     *           description: Phone of the user, optional
     *           example: +54 11 12345678
     *         address:
     *           type: string
     *           description: Address of the user, optional
     *           example: 123 Main St
     *         district:
     *           type: string
     *           description: District of the user, optional
     *           example: Central
     *         province:
     *           type: string
     *           description: Province of the user, optional
     *           example: Buenos Aires
     *
     *     LoginRequest:
     *       type: object
     *       required:
     *         - email
     *         - password
     *       properties:
     *         email:
     *           type: string
     *           description: Email of the user
     *           example: john@example.com
     *         password:
     *           type: string
     *           description: Password of the user
     *           example: password123
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
     *
     * /api/auth/register:
     *   post:
     *     summary: Register user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegisterRequest'
     *     responses:
     *       201:
     *         description: User registered successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               $ref: '#/components/schemas/User'
     * /api/auth/update:
     *   put:
     *     summary: Update user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegisterRequest'
     */
    router.post('/login', controller.loginUser)
    router.post('/register', controller.registerUser)
    router.put('/update', controller.updateUser)
    router.delete('/:id', controller.deleteUser)
    /**
     * @swagger
     * /api/auth:
     *   get:
     *     summary: Get all users
     *     tags: [Auth]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Get All Users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/GetAllUsers'
     */
    router.get('/',  controller.getUsers)


    return router;
  }
}
