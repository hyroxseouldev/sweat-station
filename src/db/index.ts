import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Database connection string from environment variables
const connectionString =
  process.env.DATABASE_URL || "postgresql://localhost:5432/sweat_station";

// Disable prefetch as it's not supported for "Transaction" and "Migrator" APIs
const client = postgres(connectionString, { prepare: false });

// Create Drizzle database instance
export const db = drizzle(client, { schema });

// Export schema for use in other parts of the application
export * from "./schema";

// Export the postgres client for advanced use cases
export { client };
