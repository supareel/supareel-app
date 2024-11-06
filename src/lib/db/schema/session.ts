import { date, pgTable, text } from "drizzle-orm/pg-core";

export const session = pgTable("sessions", {
  id: text().primaryKey(),
  userId: text().notNull(),
  expiresAt: date().notNull(),
  ipAddress: text(),
  userAgent: text(),
});
