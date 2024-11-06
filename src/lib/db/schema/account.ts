import { date, pgTable, text } from "drizzle-orm/pg-core";

export const account = pgTable("accounts", {
  id: text().primaryKey(),
  userId: text().notNull(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  accessToken: text(),
  refreshToken: text(),
  expiresAt: date().notNull(),
  password: text(),
});
