import { PrismaClient } from "@prisma/client";

/**
 * @docs https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging
 */
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

prisma.$on("query", (e) => {
  if (process.env.LISTEN_DB === "true") {
    console.log("Query: " + e.query);
    console.log("Params: " + e.params);
    console.log("Duration: " + e.duration + "ms");
  }
});

export default prisma;
