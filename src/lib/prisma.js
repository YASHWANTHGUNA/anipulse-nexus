// src/lib/prisma.js
import { PrismaClient } from '@prisma/client';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

const globalForPrisma = globalThis;

export const getPrisma = () => {
  if (!globalForPrisma.prisma) {
    // 1. Aggressively hunt for the connection string across all possible Vercel naming conventions
    const connectionString = 
      process.env.DATABASE_URL || 
      process.env.POSTGRES_PRISMA_URL || 
      process.env.POSTGRES_URL;

    // 2. The Kill Switch: If Vercel truly didn't provide a key, halt and throw a human-readable error
    if (!connectionString) {
      throw new Error(
        "🚨 CRITICAL DEPLOYMENT FAILURE: The Vercel runtime environment cannot find your database connection string. Verify your Environment Variables in the Vercel Settings."
      );
    }

    // 3. Initialize the secure Edge Pool
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool);
    
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  return globalForPrisma.prisma;
};