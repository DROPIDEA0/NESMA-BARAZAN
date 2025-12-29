/**
 * Manual Setup Script
 * يمكن استدعاؤه مرة واحدة لإعداد قاعدة البيانات وإنشاء المستخدم الافتراضي
 */

import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { hashPassword } from "./auth";
import { eq } from "drizzle-orm";

export async function setupAdmin(secretKey: string) {
  // التحقق من المفتاح السري
  if (secretKey !== "nesma-barzan-setup-2025") {
    return {
      success: false,
      message: "Invalid secret key"
    };
  }

  const results: string[] = [];

  try {
    const db = await getDb();
    
    if (!db) {
      return {
        success: false,
        message: "Database connection failed"
      };
    }

    results.push("✅ Database connected");

    // 1. تحديث جدول users
    try {
      // التحقق من وجود حقل username
      const [usernameColumns] = await db.execute(`
        SHOW COLUMNS FROM users LIKE 'username'
      `);
      
      if (Array.isArray(usernameColumns) && usernameColumns.length === 0) {
        await db.execute(`
          ALTER TABLE users 
          ADD COLUMN username VARCHAR(100) UNIQUE
        `);
        results.push("✅ Added 'username' column");
      } else {
        results.push("ℹ️  Column 'username' already exists");
      }

      // التحقق من وجود حقل password
      const [passwordColumns] = await db.execute(`
        SHOW COLUMNS FROM users LIKE 'password'
      `);
      
      if (Array.isArray(passwordColumns) && passwordColumns.length === 0) {
        await db.execute(`
          ALTER TABLE users 
          ADD COLUMN password VARCHAR(255)
        `);
        results.push("✅ Added 'password' column");
      } else {
        results.push("ℹ️  Column 'password' already exists");
      }

      // جعل openId nullable
      await db.execute(`
        ALTER TABLE users 
        MODIFY COLUMN openId VARCHAR(64) UNIQUE NULL
      `);
      results.push("✅ Modified 'openId' to be nullable");

    } catch (error: any) {
      results.push(`⚠️  Migration error: ${error.message}`);
    }

    // 2. إنشاء المستخدم الافتراضي
    try {
      // التحقق من وجود مستخدم admin
      const existingAdmin = await db.select().from(users).where(eq(users.username, "admin")).limit(1);

      if (existingAdmin.length > 0) {
        results.push("ℹ️  Admin user already exists");
        
        // عرض معلومات المستخدم الموجود
        const admin = existingAdmin[0];
        results.push(`   - Username: ${admin.username}`);
        results.push(`   - Name: ${admin.name}`);
        results.push(`   - Email: ${admin.email}`);
        results.push(`   - Has password: ${admin.password ? 'Yes' : 'No'}`);
      } else {
        // إنشاء مستخدم جديد
        const hashedPassword = await hashPassword("admin123");
        
        await db.insert(users).values({
          username: "admin",
          password: hashedPassword,
          name: "Administrator",
          email: "admin@nesmabarzan.com",
          role: "admin",
          loginMethod: "password",
        });

        results.push("✅ Default admin user created successfully!");
        results.push("   - Username: admin");
        results.push("   - Password: admin123");
        results.push("   - ⚠️  Please change the password after first login!");
      }
    } catch (error: any) {
      results.push(`❌ Error creating admin: ${error.message}`);
    }

    return {
      success: true,
      message: "Setup completed",
      details: results
    };

  } catch (error: any) {
    return {
      success: false,
      message: `Setup failed: ${error.message}`,
      details: results
    };
  }
}
