import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { appDb } from "@/lib/db/app-db";
import fs from "fs";
import path from "path";
import { hashSecurityAnswer } from "@/lib/auth/security-questions";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "sql-office-simulator-super-secret-development-key-change-in-production-12345"
);

const COOKIE_NAME = "sql_office_session";

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  honorPledgeAccepted: boolean;
  honorPledgeAcceptedAt?: string;
}

// Local file store fallback when DB is starting or in dev
const LOCAL_STORE_FILE = path.join(process.cwd(), "data", "local-users.json");

function ensureLocalStoreDir() {
  const dir = path.dirname(LOCAL_STORE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_STORE_FILE)) {
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify({ users: [] }, null, 2));
  }
}

interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash?: string;
  securityQuestion?: string;
  securityAnswerHash?: string;
  role: string;
  avatar?: string;
  honorPledgeAcceptedAt: string;
  createdAt: string;
}

function getLocalUsers(): StoredUser[] {
  ensureLocalStoreDir();
  try {
    const data = fs.readFileSync(LOCAL_STORE_FILE, "utf-8");
    return JSON.parse(data).users || [];
  } catch {
    return [];
  }
}

function saveLocalUser(user: StoredUser) {
  ensureLocalStoreDir();
  const users = getLocalUsers().filter((u) => u.email !== user.email);
  users.push(user);
  fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify({ users }, null, 2));
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(user: UserSession): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as UserSession;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function registerUser({
  email,
  password,
  name,
  honorPledgeAccepted,
  securityQuestion,
  securityAnswer,
}: {
  email: string;
  password?: string;
  name: string;
  honorPledgeAccepted: boolean;
  securityQuestion?: string;
  securityAnswer?: string;
}): Promise<{ user: UserSession; token: string }> {
  if (!honorPledgeAccepted) {
    throw new Error("You must accept the honor pledge to create an account.");
  }

  const normalizedEmail = email.toLowerCase().trim();
  const passwordHash = password ? await hashPassword(password) : undefined;
  const securityAnswerHash = securityAnswer ? await hashSecurityAnswer(securityAnswer) : undefined;
  const now = new Date();

  let userRecord: UserSession | null = null;

  // Try Prisma first
  try {
    const existing = await appDb.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      throw new Error("An account with this email already exists.");
    }

    const created = await (appDb.user as any).create({
      data: {
        email: normalizedEmail,
        name: name.trim(),
        passwordHash,
        securityQuestion: securityQuestion || null,
        securityAnswerHash: securityAnswerHash || null,
        role: "learner",
        honorPledgeAcceptedAt: now,
      },
    });

    userRecord = {
      id: created.id,
      email: created.email,
      name: created.name,
      role: created.role,
      avatar: created.avatar || undefined,
      honorPledgeAccepted: true,
      honorPledgeAcceptedAt: now.toISOString(),
    };
  } catch (err: unknown) {
    // If DB is unreachable or user exists
    if (err instanceof Error && err.message.includes("already exists")) {
      throw err;
    }

    // Fallback to local store
    const localUsers = getLocalUsers();
    if (localUsers.find((u) => u.email === normalizedEmail)) {
      throw new Error("An account with this email already exists.");
    }

    const newLocalUser: StoredUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: normalizedEmail,
      name: name.trim(),
      passwordHash,
      securityQuestion: securityQuestion || undefined,
      securityAnswerHash: securityAnswerHash || undefined,
      role: "learner",
      honorPledgeAcceptedAt: now.toISOString(),
      createdAt: now.toISOString(),
    };

    saveLocalUser(newLocalUser);
    userRecord = {
      id: newLocalUser.id,
      email: newLocalUser.email,
      name: newLocalUser.name,
      role: newLocalUser.role,
      honorPledgeAccepted: true,
      honorPledgeAcceptedAt: newLocalUser.honorPledgeAcceptedAt,
    };
  }

  const token = await createSessionToken(userRecord);
  await setSessionCookie(token);
  return { user: userRecord, token };
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password?: string;
}): Promise<{ user: UserSession; token: string }> {
  const normalizedEmail = email.toLowerCase().trim();

  // 1. Try Prisma DB
  try {
    const user = await appDb.user.findUnique({ where: { email: normalizedEmail } });
    if (user && user.passwordHash && password) {
      const match = await verifyPassword(password, user.passwordHash);
      if (!match) throw new Error("Invalid email or password.");

      const sessionUser: UserSession = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar || undefined,
        honorPledgeAccepted: Boolean(user.honorPledgeAcceptedAt),
        honorPledgeAcceptedAt: user.honorPledgeAcceptedAt?.toISOString(),
      };

      const token = await createSessionToken(sessionUser);
      await setSessionCookie(token);
      return { user: sessionUser, token };
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("Invalid email or password")) {
      throw err;
    }
    // Continue to check local store
  }

  // 2. Check local store fallback
  const localUsers = getLocalUsers();
  const localUser = localUsers.find((u) => u.email === normalizedEmail);
  if (!localUser) {
    throw new Error("Invalid email or password.");
  }

  if (password && localUser.passwordHash) {
    const match = await verifyPassword(password, localUser.passwordHash);
    if (!match) throw new Error("Invalid email or password.");
  }

  const sessionUser: UserSession = {
    id: localUser.id,
    email: localUser.email,
    name: localUser.name,
    role: localUser.role,
    avatar: localUser.avatar,
    honorPledgeAccepted: Boolean(localUser.honorPledgeAcceptedAt),
    honorPledgeAcceptedAt: localUser.honorPledgeAcceptedAt,
  };

  const token = await createSessionToken(sessionUser);
  await setSessionCookie(token);
  return { user: sessionUser, token };
}

export async function handleGoogleOAuth({
  email,
  name,
  avatar,
}: {
  email: string;
  name: string;
  avatar?: string;
}): Promise<{ user: UserSession; token: string }> {
  const normalizedEmail = email.toLowerCase().trim();
  const now = new Date();

  // Try DB first
  try {
    let user = await appDb.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      user = await appDb.user.create({
        data: {
          email: normalizedEmail,
          name,
          avatar,
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
    return { user: sessionUser, token };
  } catch {
    // Local fallback
    const localUsers = getLocalUsers();
    let localUser = localUsers.find((u) => u.email === normalizedEmail);

    if (!localUser) {
      localUser = {
        id: `google_${Date.now()}`,
        email: normalizedEmail,
        name,
        avatar,
        role: "learner",
        honorPledgeAcceptedAt: now.toISOString(),
        createdAt: now.toISOString(),
      };
      saveLocalUser(localUser);
    }

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
    return { user: sessionUser, token };
  }
}
