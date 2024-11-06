import { date, pgTable, text } from "drizzle-orm/pg-core";

export const verification = pgTable("verifications", {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: date().defaultNow(),
});
