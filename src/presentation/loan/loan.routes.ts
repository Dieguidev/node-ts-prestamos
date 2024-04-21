import { Router } from "express";
import { LoanDataSourceImpl, LoanRepositoryImpl } from "../../infrastructure";
import { LoanController } from "./loan.controller";




export class LoanRoutes {


  static get routes(): Router {
    const router = Router();

    const database = new LoanDataSourceImpl();
    const authRepository = new LoanRepositoryImpl(database)

    const controller = new LoanController(authRepository);


    /**
     * @swagger
     * components:
     *   schemas:
     *     CreateLoan:
     *       type: object
     *       properties:
     *         months:
     *           type: number
     *           description: The number of months of the loan
     *           example: 12
     *         userId:
     *           type: string
     *           description: The id of the user who created the loan
     *           example: adb39452-c9d7-44dd-aba0-d211a9855555
     *         interest:
     *           type: number
     *           description: The interest rate of the loan
     *           example: 0.05
     *         money:
     *           type: number
     *           description: The amount of the loan
     *           example: 10000
     *
     *     Loan:
     *       type: object
     *       properties:
     *         id:
     *           type: string
     *           description: Unique identifier for the loan
     *           example: adb39452-c9d7-44dd-aba0-d211a9855555
     *         months:
     *           type: number
     *           description: The number of months of the loan
     *           example: 12
     *         money:
     *           type: number
     *           description: The amount of the loan
     *           example: 10000
     *         interest:
     *           type: number
     *           description: The interest rate of the loan
     *           example: 0.05
     *         userId:
     *           type: string
     *           description: The id of the user who created the loan
     *           example: adb39452-c9d7-44dd-aba0-d211a9855555
     *         totalDebt:
     *           type: number
     *           description: The total debt of the loan
     *           example: 10000
     *         status:
     *           type: string
     *           description: The status of the loan
     *           example: true
     *         monthlyInstallments:
     *           type: array
     *           description: The monthly installments of the loan
     *           items:
     *             type: number
     *             example: 1000
     */

    /**
     * @swagger
     * /api/loan/create:
     *   post:
     *     summary: Create a new loan
     *     tags: [Loan]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateLoan'
     *     responses:
     *       200:
     *         description: Loan created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Loan'
     *       500:
     *         description: Internal server error
     */

    router.post('/create', controller.createLoan)



    return router;
  }
}
