import { envs } from "./config";
import { prisma } from "./data/postgresql";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


(() => {
  main();
})()

async function main() {

  prisma.$connect()
  .then(() => {
    console.log('Prisma connected to the database successfully');
  })
  .catch((error: Error) => {
    console.log('Error connecting to the database:', error);
  });

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  }).start()
}
