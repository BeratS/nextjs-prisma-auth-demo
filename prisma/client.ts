// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  let gPrisma = (global as any)?.prisma;
  if (!gPrisma) {
    gPrisma = new PrismaClient();
  }
  prisma = gPrisma;
}

export default prisma;