// Prisma 7 configuration for Supabase
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use DIRECT connection for Prisma CLI (migrate, introspect, etc.)
    // The pooled DATABASE_URL is used by PrismaClient at runtime.
    url: process.env["DIRECT_URL"],
  },
});
