import { BcryptAdapter } from "../../config";




export const seedData = {

  roles: [
    { role: 'ADMIN' },
    { role: 'CLIENT' },
  ],

  users: [
    { dni: '44796970', email: 'diego@gmail.com', password: BcryptAdapter.hash('123456'), name: 'Diego', lastName: 'Garay', address: 'Calle falsa 123', phone: '123456789', province: 'Buenos Aires', district: 'CABA', role: 'ADMIN' },
    { dni: '44796971', email: 'diego1@gmail.com', password: BcryptAdapter.hash('123456'), name: 'Diego', lastName: 'Garay', address: 'Calle falsa 123', phone: '123456789', province: 'Buenos Aires', district: 'CABA', role: 'CLIENT' },
  ],
}
