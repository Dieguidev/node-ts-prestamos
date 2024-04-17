import { Router } from "express";
import { LoanDataSourceImpl, LoanRepositoryImpl } from "../../infrastructure";
import { LoanController } from "./loan.controller";




export class LoanRoutes {


  static get routes(): Router {
    const router = Router();

    const database = new LoanDataSourceImpl();
    const authRepository = new LoanRepositoryImpl(database)

    const controller = new LoanController(authRepository);

    router.post('/create', controller.createLoan)

    // router.post('/login', controller.loginUser)
    // router.post('/register', controller.registerUser)
    // router.put('/update',  controller.updateUser)
    // router.delete('/:id', controller.deleteUser)

    // router.get('/', [AuthMiddleware.validateJWT], controller.getUsers)


    return router;
  }
}
