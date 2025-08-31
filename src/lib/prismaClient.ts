import { PrismaClient } from "../../generated/prisma";
declare global {
  // allow global `var prisma` in dev
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
