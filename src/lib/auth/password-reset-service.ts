import crypto from "crypto";
import bcrypt from "bcryptjs";
import { appDb } from "@/lib/db/app-db";
import { safeReadJson, safeWriteJson } from "@/lib/storage/file-storage";

const RESETS_FILENAME = "password-resets.json";
const USERS_FILENAME = "local-users.json";

export interface PasswordResetEntry {
  email: string;
  token: string;
  pin: string;
  expiresAt: number;
  createdAt: number;
  used: boolean;
}

function getStoredResets(): PasswordResetEntry[] {
  const data = safeReadJson<{ resets: PasswordResetEntry[] }>(RESETS_FILENAME, { resets: [] });
  return data.resets || [];
}

function saveStoredResets(resets: PasswordResetEntry[]) {
  // Filter out expired entries older than 24h to keep store clean
  const now = Date.now();
  const cleaned = resets.filter((r) => r.expiresAt > now - 24 * 60 * 60 * 1000);
  safeWriteJson(RESETS_FILENAME, { resets: cleaned });
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
  const data = safeReadJson<{ users: any[] }>(USERS_FILENAME, { users: [] });
  const exists = (data.users || []).some((u: any) => u.email.toLowerCase() === normalized);
  if (exists) return true;

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
  const data = safeReadJson<{ users: any[] }>(USERS_FILENAME, { users: [] });
  if (data.users && data.users.length > 0) {
    const updatedUsers = data.users.map((u: any) => {
      if (u.email.toLowerCase() === normalized) {
        return { ...u, passwordHash };
      }
      return u;
    });
    safeWriteJson(USERS_FILENAME, { users: updatedUsers });
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
