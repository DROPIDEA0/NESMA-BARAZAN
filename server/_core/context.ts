import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { ENV } from "./env";
import * as db from "../db";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  // Development bypass: create a default admin user
  if (ENV.devBypassAuth && !ENV.isProduction) {
    try {
      // Try to get or create a dev admin user
      const devOpenId = "dev-admin-local";
      user = await db.getUserByOpenId(devOpenId);
      
      if (!user) {
        await db.upsertUser({
          openId: devOpenId,
          name: "Dev Admin",
          email: "admin@dev.local",
          role: "admin",
          loginMethod: "dev",
          lastSignedIn: new Date(),
        });
        user = await db.getUserByOpenId(devOpenId);
      } else {
        // Update role to admin if not already
        if (user.role !== "admin") {
          await db.upsertUser({
            openId: devOpenId,
            role: "admin",
          });
          user = await db.getUserByOpenId(devOpenId);
        }
      }
      
      console.log("[Dev Mode] Using bypass authentication with admin user");
    } catch (error) {
      console.error("[Dev Mode] Failed to create dev admin user:", error);
    }
  } else {
    // Normal authentication flow
    try {
      user = await sdk.authenticateRequest(opts.req);
    } catch (error) {
      // Authentication is optional for public procedures.
      user = null;
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
