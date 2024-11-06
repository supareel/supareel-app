// Make sure to install the 'pg' package
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DATABASE_URL!);
const result = await db.execute("select 1");

if (result.rows.length < 1) {
  throw new Error("Database connection failed");
} else {
  console.log("Database connection successful !!!");
}

export { db };
