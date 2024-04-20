import express, { Router } from 'express'
import swaggerUI from 'swagger-ui-express'
import { swaggerSpec } from '../config/swagger';

interface Options {
  port?: number;
  routes: Router;
}

export class Server {

  public readonly app = express()
  private readonly port: number;
  private readonly routes: Router;


  constructor(options: Options) {
    const { port = 3100, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {

    //middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));



    //rutas
    this.app.use(this.routes);
    //swagger

    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`)
    })



  }
}
