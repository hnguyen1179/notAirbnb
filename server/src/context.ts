import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  authorization: string;
  req: any; // HTTP request carrying the `Authorization` header
}

export function createContext(req: any): Context {
  return {
    ...req,
    prisma,
  };
}
