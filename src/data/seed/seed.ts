

import { prisma } from "../postgresql";
import { seedData } from "./data";


(async () => {
  await prisma.$connect();

  await main();


  await prisma.$disconnect();
})();


const randomBetween0AndX = (x: number) => {
  return Math.floor(Math.random() * x);
}

async function main() {

  //eliminar todo de la base de datos - warning
  await Promise.all([
    prisma.loans.deleteMany(),
    prisma.user.deleteMany(),
    prisma.role.deleteMany(),
  ])

  //crear roles del seed.ts
  const roles = await prisma.role.createMany({ data: seedData.roles })


  //crear usuarios del seed.ts
  const usersData = await Promise.all(seedData.users.map(async user => {
    const roleIdObj = await prisma.role.findFirst({ where: { role: user.role } });
    const roleId = roleIdObj?.id;
    if (roleId === undefined) {
      throw new Error(`No se pudo encontrar un roleId para el usuario ${user.name}`);
    }
    const { role, ...rest } = user;
    return {
      dni: rest.dni,
      email: rest.email,
      name: rest.name,
      lastName: rest.lastName,
      password: rest.password,
      address: rest.address,
      phone: rest.phone,
      province: rest.province,
      district: rest.district,
      roleId: roleId,
    };
  }));

  await prisma.user.createMany({
    data: usersData,
  });


  // //crear productos del seed.ts
  // const products = await ProductModel.insertMany(
  //   seedData.products.map(product => ({
  //     ...product, user: users[randomBetween0AndX(users.length)].id,
  //     category: categories[randomBetween0AndX(categories.length)].id
  //   }))
  // )

  console.log('seed ok');

}
