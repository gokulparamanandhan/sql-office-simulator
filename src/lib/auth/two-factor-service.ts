import crypto from "crypto";
import { appDb } from "@/lib/db/app-db";
import { createSessionToken, setSessionCookie, UserSession } from "./auth-service";
import fs from "fs";
import path from "path";

export interface TwoFactorChallenge {
  email: string;
  name: string;
  avatar?: string;
  code: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: number;
  createdAt: number;
}

// In-memory 2FA challenge store (with file backup for resilience across worker restarts)
const challengeStore = new Map<string, TwoFactorChallenge>();
const LOCAL_STORE_FILE = path.join(process.cwd(), "data", "local-users.json");

function ensureLocalStore() {
  const dir = path.dirname(LOCAL_STORE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(LOCAL_STORE_FILE)) {
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify({ users: [] }, null, 2));
  }
}

interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash?: string;
  role: string;
  avatar?: string;
  provider?: string;
  twoFactorVerified?: boolean;
  twoFactorVerifiedAt?: string;
  honorPledgeAcceptedAt: string;
  createdAt: string;
}

function getStoredUsers(): StoredUser[] {
  ensureLocalStore();
  try {
    const raw = fs.readFileSync(LOCAL_STORE_FILE, "utf-8");
    return JSON.parse(raw).users || [];
  } catch {
    return [];
  }
}

function saveStoredUser(user: StoredUser) {
  ensureLocalStore();
  const users = getStoredUsers().filter((u) => u.email !== user.email);
  users.push(user);
  fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify({ users }, null, 2));
}

/**
 * Generate a cryptographically secure 6-digit numeric OTP code
 */
function generate6DigitCode(): string {
  const num = crypto.randomInt(100000, 999999);
  return num.toString();
}

/**
 * Create a new Two-Factor Authentication challenge
 */
export function createTwoFactorChallenge(
  email: string,
  name: string = "",
  avatar?: string
): TwoFactorChallenge {
  const normalizedEmail = email.toLowerCase().trim();
  const code = generate6DigitCode();
  const now = Date.now();

  const challenge: TwoFactorChallenge = {
    email: normalizedEmail,
    name: name || normalizedEmail.split("@")[0],
    avatar: avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(normalizedEmail)}`,
    code,
    attempts: 0,
    maxAttempts: 5,
    expiresAt: now + 10 * 60 * 1000, // 10 minutes
    createdAt: now,
  };

  challengeStore.set(normalizedEmail, challenge);
  return challenge;
}

/**
 * Retrieve active challenge for an email
 */
export function getTwoFactorChallenge(email: string): TwoFactorChallenge | null {
  const normalizedEmail = email.toLowerCase().trim();
  const challenge = challengeStore.get(normalizedEmail);
  if (!challenge) return null;

  if (Date.now() > challenge.expiresAt) {
    challengeStore.delete(normalizedEmail);
    return null;
  }

  return challenge;
}

/**
 * Verify Two-Factor Authentication code and establish authenticated session
 */
export async function verifyTwoFactorCode(
  email: string,
  inputCode: string
): Promise<{
  success: boolean;
  user?: UserSession;
  token?: string;
  error?: string;
  attemptsRemaining?: number;
}> {
  const normalizedEmail = email.toLowerCase().trim();
  const challenge = challengeStore.get(normalizedEmail);

  if (!challenge) {
    return {
      success: false,
      error: "Verification code expired or not requested. Please request a new code.",
    };
  }

  if (Date.now() > challenge.expiresAt) {
    challengeStore.delete(normalizedEmail);
    return {
      success: false,
      error: "Verification code has expired. Please request a new code.",
    };
  }

  // Increment attempts
  challenge.attempts += 1;
  const attemptsRemaining = challenge.maxAttempts - challenge.attempts;

  if (challenge.attempts > challenge.maxAttempts) {
    challengeStore.delete(normalizedEmail);
    return {
      success: false,
      error: "Maximum verification attempts exceeded. For security, please request a new code.",
      attemptsRemaining: 0,
    };
  }

  const cleanInput = inputCode.replace(/\s+/g, "").trim();
  if (cleanInput !== challenge.code) {
    return {
      success: false,
      error: `Invalid verification code. ${Math.max(0, attemptsRemaining)} attempt(s) remaining.`,
      attemptsRemaining: Math.max(0, attemptsRemaining),
    };
  }

  // Code is valid! Delete challenge and establish authenticated session
  challengeStore.delete(normalizedEmail);
  const now = new Date();

  // Try saving/updating in Database
  try {
    let user = await appDb.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      user = await appDb.user.create({
        data: {
          email: normalizedEmail,
          name: challenge.name,
          avatar: challenge.avatar,
          role: "learner",
          honorPledgeAcceptedAt: now,
        },
      });
    }

    const sessionUser: UserSession = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar || undefined,
      honorPledgeAccepted: true,
      honorPledgeAcceptedAt: user.honorPledgeAcceptedAt?.toISOString() || now.toISOString(),
    };

    const token = await createSessionToken(sessionUser);
    await setSessionCookie(token);

    // Also update local store with 2FA verified flag for admin reporting
    saveStoredUser({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar || undefined,
      provider: "Google OAuth (2FA Verified)",
      twoFactorVerified: true,
      twoFactorVerifiedAt: now.toISOString(),
      honorPledgeAcceptedAt: now.toISOString(),
      createdAt: user.createdAt?.toISOString() || now.toISOString(),
    });

    return {
      success: true,
      user: sessionUser,
      token,
    };
  } catch {
    // Database offline fallback to local store
    const localUsers = getStoredUsers();
    let localUser = localUsers.find((u) => u.email === normalizedEmail);

    if (!localUser) {
      localUser = {
        id: `google_2fa_${Date.now()}`,
        email: normalizedEmail,
        name: challenge.name,
        avatar: challenge.avatar,
        role: "learner",
        provider: "Google OAuth (2FA Verified)",
        twoFactorVerified: true,
        twoFactorVerifiedAt: now.toISOString(),
        honorPledgeAcceptedAt: now.toISOString(),
        createdAt: now.toISOString(),
      };
    } else {
      localUser.twoFactorVerified = true;
      localUser.twoFactorVerifiedAt = now.toISOString();
      localUser.provider = "Google OAuth (2FA Verified)";
    }

    saveStoredUser(localUser);

    const sessionUser: UserSession = {
      id: localUser.id,
      email: localUser.email,
      name: localUser.name,
      role: localUser.role,
      avatar: localUser.avatar,
      honorPledgeAccepted: true,
      honorPledgeAcceptedAt: localUser.honorPledgeAcceptedAt,
    };

    const token = await createSessionToken(sessionUser);
    await setSessionCookie(token);

    return {
      success: true,
      user: sessionUser,
      token,
    };
  }
}
