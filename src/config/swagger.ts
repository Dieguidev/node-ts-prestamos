import swaggerJSDoc from "swagger-jsdoc";
import { envs } from "./envs";


export const swaggerSpec = swaggerJSDoc({
  definition:{
    openapi: '3.0.0',
    info:{
      title: 'Loans API',
      version: '1.0.0',
      description: 'A simple express loans api'
    },
    servers: [
      {
        url: envs.URL_SWAGGER
      }
    ]
  },
  apis: ['./src/presentation/auth/auth.routes.ts', './src/presentation/loan/loan.routes.ts']
});



