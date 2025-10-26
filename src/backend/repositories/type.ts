import type { PrismaClient, Prisma } from "@prisma/client";

export type TxClient = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;
export type PrismaTx = TxClient | Prisma.TransactionClient;
