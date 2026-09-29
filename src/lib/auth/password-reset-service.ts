import crypto from "crypto";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { appDb } from "@/lib/db/app-db";

const RESET_FILE = path.join(process.cwd(), "data", "password-resets.json");
const LOCAL_USERS_FILE = path.join(process.cwd(), "data", "local-users.json");

export interface PasswordResetEntry {
  email: string;
  token: string;
  pin: string;
  expiresAt: number;
  createdAt: number;
  used: boolean;
}

function ensureDataDir() {
  const dir = path.dirname(RESET_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getStoredResets(): PasswordResetEntry[] {
  ensureDataDir();
  if (fs.existsSync(RESET_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(RESET_FILE, "utf-8"));
      return data.resets || [];
    } catch {
      return [];
    }
  }
  return [];
}

function saveStoredResets(resets: PasswordResetEntry[]) {
  ensureDataDir();
  // Filter out expired entries older than 24h to keep file clean
  const now = Date.now();
  const cleaned = resets.filter((r) => r.expiresAt > now - 24 * 60 * 60 * 1000);
  fs.writeFileSync(RESET_FILE, JSON.stringify({ resets: cleaned }, null, 2));
}

/**
 * Check if a user account exists for given email (in Prisma DB or local store)
 */
export async function userExists(email: string): Promise<boolean> {
  const normalized = email.toLowerCase().trim();

  // 1. Prisma DB
  try {
    const user = await appDb.user.findUnique({ where: { email: normalized } });
    if (user) return true;
  } catch {
    // DB offline
  }

  // 2. Local JSON store
  if (fs.existsSync(LOCAL_USERS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(LOCAL_USERS_FILE, "utf-8"));
      const exists = (data.users || []).some((u: any) => u.email.toLowerCase() === normalized);
      if (exists) return true;
    } catch {
      // Ignore
    }
  }

  return false;
}

/**
 * Create a password reset request with secure token & PIN
 */
export async function createPasswordResetRequest(email: string): Promise<{
  token: string;
  pin: string;
  email: string;
  expiresAt: number;
}> {
  const normalized = email.toLowerCase().trim();
  const token = crypto.randomBytes(32).toString("hex");
  const pin = crypto.randomInt(100000, 999999).toString();
  const now = Date.now();
  const expiresAt = now + 60 * 60 * 1000; // 1 hour

  const entry: PasswordResetEntry = {
    email: normalized,
    token,
    pin,
    expiresAt,
    createdAt: now,
    used: false,
  };

  const resets = getStoredResets().filter((r) => r.email !== normalized || r.used);
  resets.push(entry);
  saveStoredResets(resets);

  return { token, pin, email: normalized, expiresAt };
}

/**
 * Verify if a reset token or pin is valid
 */
export function verifyResetToken(tokenOrPin: string): PasswordResetEntry | null {
  const clean = tokenOrPin.trim();
  const resets = getStoredResets();
  const now = Date.now();

  const match = resets.find(
    (r) => !r.used && r.expiresAt > now && (r.token === clean || r.pin === clean)
  );

  return match || null;
}

/**
 * Reset password using valid token
 */
export async function completePasswordReset(
  tokenOrPin: string,
  newPassword: string
): Promise<{ success: boolean; email?: string; error?: string }> {
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long." };
  }

  const entry = verifyResetToken(tokenOrPin);
  if (!entry) {
    return { success: false, error: "Invalid or expired password reset link." };
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  const normalized = entry.email;

  // 1. Update in Prisma DB
  try {
    await appDb.user.update({
      where: { email: normalized },
      data: { passwordHash },
    });
  } catch {
    // If Prisma DB failed or user only in local store
  }

  // 2. Update in local store
  if (fs.existsSync(LOCAL_USERS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(LOCAL_USERS_FILE, "utf-8"));
      const users = (data.users || []).map((u: any) => {
        if (u.email.toLowerCase() === normalized) {
          return { ...u, passwordHash };
        }
        return u;
      });
      fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify({ users }, null, 2));
    } catch {
      // Ignore
    }
  }

  // Mark token as used
  const resets = getStoredResets().map((r) => {
    if (r.token === entry.token) {
      return { ...r, used: true };
    }
    return r;
  });
  saveStoredResets(resets);

  return { success: true, email: normalized };
}
