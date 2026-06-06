import { PrismaClient } from '@prisma/client';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // We won't throw a fatal error here to avoid breaking the build process on Vercel before env vars are injected
  console.warn("WARNING: DATABASE_URL is not set in the environment.");
}

const pool = new Pool({ connectionString: connectionString || "" });
const adapter = new PrismaNeon(pool);

const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}