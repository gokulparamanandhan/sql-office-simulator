import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { appDb } from "@/lib/db/app-db";
import { SECURITY_QUESTIONS } from "./security-questions-constants";
export { SECURITY_QUESTIONS };

const LOCAL_STORE_FILE = path.join(process.cwd(), "data", "local-users.json");

function ensureLocalStoreDir() {
  const dir = path.dirname(LOCAL_STORE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getLocalUsers(): any[] {
  ensureLocalStoreDir();
  try {
    if (fs.existsSync(LOCAL_STORE_FILE)) {
      const data = fs.readFileSync(LOCAL_STORE_FILE, "utf-8");
      return JSON.parse(data).users || [];
    }
  } catch {
    // Ignore
  }
  return [];
}

function saveLocalUsers(users: any[]) {
  ensureLocalStoreDir();
  fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify({ users }, null, 2));
}

export function normalizeSecurityAnswer(answer: string): string {
  return answer.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function hashSecurityAnswer(answer: string): Promise<string> {
  const clean = normalizeSecurityAnswer(answer);
  return bcrypt.hash(clean, 10);
}

export async function verifySecurityAnswer(answer: string, hash: string): Promise<boolean> {
  if (!answer || !hash) return false;
  const clean = normalizeSecurityAnswer(answer);
  return bcrypt.compare(clean, hash);
}

/**
 * Retrieve a user's security question by email
 */
export async function getUserSecurityQuestion(email: string): Promise<{
  found: boolean;
  question?: string;
  hasSecurityQuestion: boolean;
}> {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Check Prisma DB
  try {
    const user = await (appDb.user as any).findUnique({
      where: { email: cleanEmail },
      select: { email: true, securityQuestion: true, securityAnswerHash: true },
    });
    if (user) {
      return {
        found: true,
        question: user.securityQuestion || undefined,
        hasSecurityQuestion: Boolean(user.securityQuestion && user.securityAnswerHash),
      };
    }
  } catch {
    // DB offline fallback
  }

  // 2. Check local JSON store
  const localUsers = getLocalUsers();
  const localUser = localUsers.find((u) => u.email.toLowerCase() === cleanEmail);
  if (localUser) {
    return {
      found: true,
      question: localUser.securityQuestion || undefined,
      hasSecurityQuestion: Boolean(localUser.securityQuestion && localUser.securityAnswerHash),
    };
  }

  return { found: false, hasSecurityQuestion: false };
}

/**
 * Verify security answer and reset user password
 */
export async function resetPasswordWithSecurityAnswer({
  email,
  answer,
  newPassword,
}: {
  email: string;
  answer: string;
  newPassword: string;
}): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();

  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long." };
  }

  let storedQuestion: string | null = null;
  let storedAnswerHash: string | null = null;
  let inPrisma = false;
  let inLocal = false;

  // 1. Check Prisma
  try {
    const user = await (appDb.user as any).findUnique({
      where: { email: cleanEmail },
    });
    if (user) {
      inPrisma = true;
      storedQuestion = user.securityQuestion || null;
      storedAnswerHash = user.securityAnswerHash || null;
    }
  } catch {
    // DB offline
  }

  // 2. Check local store
  const localUsers = getLocalUsers();
  const localIdx = localUsers.findIndex((u) => u.email.toLowerCase() === cleanEmail);
  if (localIdx !== -1) {
    inLocal = true;
    if (!storedAnswerHash) {
      storedQuestion = localUsers[localIdx].securityQuestion || null;
      storedAnswerHash = localUsers[localIdx].securityAnswerHash || null;
    }
  }

  if (!inPrisma && !inLocal) {
    return { success: false, error: "No account found with this email address." };
  }

  if (!storedAnswerHash) {
    return {
      success: false,
      error: "This account does not have a security question configured. Please sign in or contact admin.",
    };
  }

  // Verify answer
  const isMatch = await verifySecurityAnswer(answer, storedAnswerHash);
  if (!isMatch) {
    return { success: false, error: "Incorrect answer to security question. Please try again." };
  }

  // Hash new password
  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  // Update in Prisma
  if (inPrisma) {
    try {
      await appDb.user.update({
        where: { email: cleanEmail },
        data: { passwordHash: newPasswordHash },
      });
    } catch {
      // Ignore
    }
  }

  // Update in local store
  if (inLocal) {
    localUsers[localIdx].passwordHash = newPasswordHash;
    saveLocalUsers(localUsers);
  }

  return { success: true };
}
