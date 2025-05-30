// src/lib/prismaClient.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  __internal: {
    engine: {
      enableQueryEngine: true,
      enablePreparedStatements: false, // ✅ Important for Supabase
    },
  },
});

export default prisma;
