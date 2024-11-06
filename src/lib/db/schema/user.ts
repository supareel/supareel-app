import { boolean, date, pgTable, text } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().unique().notNull(),
  emailVerified: boolean().default(false),
  image: text(),
  createdAt: date().defaultNow(),
  updatedAt: date().defaultNow(),
});
