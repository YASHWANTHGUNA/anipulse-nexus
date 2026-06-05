// src/lib/prisma.js
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const getPrisma = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!globalForPrisma.prisma) {
    // 1. Notice the strict Prisma 7.8.0 syntax: 'datasources' (plural) and 'db'
    globalForPrisma.prisma = new PrismaClient({
      datasources: {
        db: {
          url: connectionString || "postgresql://dummy:dummy@localhost:5432/dummy",
        },
      },
    });
  }
  
  return globalForPrisma.prisma;
};