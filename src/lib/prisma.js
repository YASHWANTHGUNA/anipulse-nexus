// src/lib/prisma.js
import { PrismaClient } from '@prisma/client';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

const globalForPrisma = globalThis;

export const getPrisma = () => {
  if (!globalForPrisma.prisma) {
    // 1. Initialize the Vercel-safe WebSocket pool
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    // 2. Wrap it in the Prisma 7 Adapter
    const adapter = new PrismaNeon(pool);
    
    // 3. Inject the adapter directly into the client constructor
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  return globalForPrisma.prisma;
};