/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq, desc, and } from "drizzle-orm";
import { db } from "./index";
import {
  users,
  posts,
  type User,
  type NewUser,
  type Post,
  type NewPost,
} from "./schema";
import { handleDatabaseError, withTransaction } from "./utils";
import { count } from "drizzle-orm";

// User Service
export class UserService {
  /**
   * Create a new user
   */
  static async create(userData: NewUser): Promise<User> {
    try {
      const [user] = await db.insert(users).values(userData).returning();
      return user;
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  static async getById(id: number): Promise<User | null> {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
      return result[0] || null;
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * Get user by email
   */
  static async getByEmail(email: string): Promise<User | null> {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      return result[0] || null;
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * Update user
   */
  static async update(
    id: number,
    updates: Partial<NewUser>
  ): Promise<User | null> {
    try {
      const [user] = await db
        .update(users)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(users.id, id))
        .returning();
      return user || null;
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * Delete user
   */
  static async delete(id: number): Promise<boolean> {
    try {
      const result = await db.delete(users).where(eq(users.id, id));
      return (result as any).rowCount > 0;
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * List all users with pagination
   */
  static async list(page: number = 1, limit: number = 10) {
    try {
      const offset = (page - 1) * limit;

      const userList = await db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(limit)
        .offset(offset);

      const [{ count: total }] = await db
        .select({ count: count() })
        .from(users);

      return {
        data: userList,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * Get users by role
   */
  static async getByRole(
    role: "admin" | "general",
    page: number = 1,
    limit: number = 10
  ) {
    try {
      const offset = (page - 1) * limit;

      const userList = await db
        .select()
        .from(users)
        .where(eq(users.role, role))
        .orderBy(desc(users.createdAt))
        .limit(limit)
        .offset(offset);

      const [{ count: total }] = await db
        .select({ count: count() })
        .from(users)
        .where(eq(users.role, role));

      return {
        data: userList,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * Check if user has specific role
   */
  static async hasRole(
    id: number,
    role: "admin" | "general"
  ): Promise<boolean> {
    try {
      const user = await this.getById(id);
      return user?.role === role;
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * Check if user is admin
   */
  static async isAdmin(id: number): Promise<boolean> {
    return this.hasRole(id, "admin");
  }

  /**
   * Update user role
   */
  static async updateRole(
    id: number,
    role: "admin" | "general"
  ): Promise<User | null> {
    try {
      const [user] = await db
        .update(users)
        .set({ role, updatedAt: new Date() })
        .where(eq(users.id, id))
        .returning();
      return user || null;
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * Get all admin users
   */
  static async getAdmins(): Promise<User[]> {
    try {
      return await db
        .select()
        .from(users)
        .where(eq(users.role, "admin"))
        .orderBy(desc(users.createdAt));
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }
}

// Post Service
export class PostService {
  /**
   * Create a new post
   */
  static async create(postData: NewPost): Promise<Post> {
    try {
      const [post] = await db.insert(posts).values(postData).returning();
      return post;
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * Get post by ID
   */
  static async getById(id: number): Promise<Post | null> {
    try {
      const result = await db
        .select()
        .from(posts)
        .where(eq(posts.id, id))
        .limit(1);
      return result[0] || null;
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * Get posts by author
   */
  static async getByAuthor(authorId: number, published?: boolean) {
    try {
      const conditions = [eq(posts.authorId, authorId)];

      if (published !== undefined) {
        conditions.push(eq(posts.published, published));
      }

      return await db
        .select()
        .from(posts)
        .where(and(...conditions))
        .orderBy(desc(posts.createdAt));
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * Update post
   */
  static async update(
    id: number,
    updates: Partial<NewPost>
  ): Promise<Post | null> {
    try {
      const [post] = await db
        .update(posts)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(posts.id, id))
        .returning();
      return post || null;
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * Delete post
   */
  static async delete(id: number): Promise<boolean> {
    try {
      const result = await db.delete(posts).where(eq(posts.id, id));
      return (result as any).rowCount > 0;
    } catch (error: any) {
      handleDatabaseError(error);
      throw error;
    }
  }

  /**
   * Create a post with author validation in a transaction
   */
  static async createWithValidation(postData: NewPost): Promise<Post> {
    return withTransaction(async (tx: any) => {
      // Check if author exists
      const author = await tx
        .select()
        .from(users)
        .where(eq(users.id, postData.authorId!))
        .limit(1);

      if (!author.length) {
        throw new Error("Author not found");
      }

      // Create the post
      const [post] = await tx.insert(posts).values(postData).returning();
      return post;
    });
  }
}
