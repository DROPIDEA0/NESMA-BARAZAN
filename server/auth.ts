import bcrypt from "bcryptjs";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import mysql from "mysql2/promise";
import { ENV } from "./_core/env";
import { logger } from "./logger";

const SALT_ROUNDS = 10;

/**
 * Direct MySQL connection for authentication
 * Bypasses Drizzle ORM for simpler, more reliable connection
 */
async function getDirectMySQLConnection() {
  try {
    const connection = await mysql.createConnection({
      host: ENV.DB_HOST,
      user: ENV.DB_USER,
      password: ENV.DB_PASSWORD,
      database: ENV.DB_NAME
    });
    return connection;
  } catch (error) {
    console.error('[MySQL] Direct connection failed:', error);
    return null;
  }
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Authenticate a user with username and password
 * Updated: 2025-12-30
 */
export async function authenticateUser(username: string, password: string) {
  try {
    logger.info('AUTH', 'Login attempt', { username });
    logger.info('AUTH', 'Using direct MySQL connection');
    
    // Try direct MySQL connection first
    const connection = await getDirectMySQLConnection();
    if (connection) {
      try {
        const [rows] = await connection.execute(
          'SELECT id, username, password, name, email, avatar, role, openId, createdAt, updatedAt FROM users WHERE username = ? LIMIT 1',
          [username]
        );
        await connection.end();
        
        const user = Array.isArray(rows) && rows.length > 0 ? rows[0] as any : null;
        logger.info('AUTH', 'Direct MySQL - User found', { found: !!user, username });
        
        if (!user || !user.password) {
          logger.warn('AUTH', 'User not found or no password', { username, hasUser: !!user, hasPassword: user?.password ? 'yes' : 'no' });
          return null;
        }
        
        // Verify password
        logger.info('AUTH', 'Verifying password');
        const isValid = await verifyPassword(password, user.password);
        logger.info('AUTH', 'Password verification result', { isValid });
        if (!isValid) {
          logger.warn('AUTH', 'Invalid password', { username });
          return null;
        }
        
        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        logger.info('AUTH', 'Login successful', { username, userId: user.id });
        return userWithoutPassword;
      } catch (error) {
        logger.error('AUTH', 'Direct MySQL query error', { error: error instanceof Error ? error.message : String(error) });
        await connection.end().catch(() => {});
      }
    }
    
    // Fallback to Drizzle ORM
    logger.info('AUTH', 'Falling back to Drizzle ORM');
    const db = await getDb();
    if (!db) {
      logger.warn('AUTH', 'Database not available');
      return null;
    }
    
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    const user = result.length > 0 ? result[0] : null;
    logger.info('AUTH', 'Drizzle - User found', { found: !!user });

    if (!user || !user.password) {
      return null;
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    logger.error('AUTH', 'Authentication error', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
    return null;
  }
}

/**
 * Create default admin user if not exists
 */
export async function createDefaultAdmin() {
  try {
    const db = await getDb();
    if (!db) {
      console.warn("[Auth] Database not available");
      return;
    }
    
    // Check if any admin exists
    const result = await db.select().from(users).where(eq(users.role, "admin")).limit(1);
    const existingAdmin = result.length > 0 ? result[0] : null;

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create default admin
    const hashedPassword = await hashPassword("admin123");
    await db.insert(users).values({
      username: "admin",
      password: hashedPassword,
      name: "Administrator",
      email: "admin@nesmabarzan.com",
      role: "admin",
      loginMethod: "password",
    });

    console.log("Default admin user created successfully");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("⚠️  Please change the password after first login!");
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
}
