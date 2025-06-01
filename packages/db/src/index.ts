import { PrismaClient } from "@prisma/client";


// import { PrismaClient } from "@prisma/client/extension";  // might cause some trouble there are two imports
// PrismaClient

export const prismaClient = new PrismaClient();