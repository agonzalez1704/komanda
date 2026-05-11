import "server-only";
import postgres from "postgres";

declare global {
  var __komandaPg: ReturnType<typeof postgres> | undefined;
}

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("Missing DATABASE_URL — server-side Postgres client unavailable.");
}

export const sql =
  globalThis.__komandaPg ??
  postgres(url, {
    ssl: "require",
    max: 5,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__komandaPg = sql;
}
