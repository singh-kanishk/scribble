import { pgEnum} from "drizzle-orm/pg-core";
import { pgTable, varchar ,uuid} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";


export const roleEnum= pgEnum('role',['USER','ADMIN'])

export const users = pgTable("users", {
  id: uuid('id').primaryKey().notNull().default(sql`gen_random_uuid()`),
  name: varchar({ length: 20 }).notNull(),
  username: varchar({ length: 255 }).notNull().unique(),
  password:varchar({length:255}).notNull(),
  role:roleEnum().default('USER')
});
