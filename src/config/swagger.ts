import swaggerJSDoc from "swagger-jsdoc";


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
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/presentation/auth/auth.routes.ts', './src/presentation/loan/loan.routes.ts']
});



