/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { eq, desc, asc, count } from "drizzle-orm";
import { db } from "./index";

/**
 * Utility to handle database errors
 */
export function handleDatabaseError(error: any) {
  console.error("Database error:", error);

  // Handle common PostgreSQL errors
  if (error.code === "23505") {
    throw new Error("A record with this value already exists");
  }

  if (error.code === "23503") {
    throw new Error("Referenced record does not exist");
  }

  if (error.code === "23502") {
    throw new Error("Required field is missing");
  }

  // Generic error
  throw new Error("Database operation failed");
}

/**
 * Transaction wrapper utility
 */
export async function withTransaction<T>(
  callback: (tx: any) => Promise<T>
): Promise<T> {
  return await db.transaction(callback);
}
