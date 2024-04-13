/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "dni" VARCHAR NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "district" VARCHAR NOT NULL,
    "province" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "img" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role-id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" VARCHAR NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role-id_fkey" FOREIGN KEY ("role-id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
