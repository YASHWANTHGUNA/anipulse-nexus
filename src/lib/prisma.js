// src/lib/prisma.js
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

// 1. Create a standard Postgres connection pool using the 'pg' driver
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. Wrap the pool in Prisma's PostgreSQL adapter
const adapter = new PrismaPg(pool);

// 3. Initialize Prisma Client with the adapter instead of 'datasources'
export const prisma = 
  globalForPrisma.prisma || 
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;