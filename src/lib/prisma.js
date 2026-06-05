// src/lib/prisma.js
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const getPrisma = () => {
  // 1. Grab the live URL
  const connectionString = process.env.DATABASE_URL;

  if (!globalForPrisma.prisma) {
    // 2. Inject the URL directly into Prisma's native engine.
    // If the compiler evaluates this during build (when the string might be empty), 
    // we feed it a dummy URL so it doesn't cache a "localhost" panic state.
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