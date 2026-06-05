// src/lib/prisma.js
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const getPrisma = () => {
  if (!globalForPrisma.prisma) {
    // 1. We use the modern, flat 'datasourceUrl' property to inject the Vercel key
    globalForPrisma.prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL
    });
  }
  
  return globalForPrisma.prisma;
};