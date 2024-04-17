import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { LoanRoutes } from "./loan/loan.routes";



export class AppRoutes {


  static get routes():Router {
    const router = Router();
    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/loan', LoanRoutes.routes)
    return router;
  }
}
