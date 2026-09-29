import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getCurrentUser } from "./auth-service";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET ||
    "sql-office-simulator-super-secret-development-key-change-in-production-12345"
);

const ADMIN_COOKIE_NAME = "sql_office_admin_session";

// Environment-configured admin credentials with sensible defaults for local development
export const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "Podpanni@007",
};

export interface AdminSession {
  username: string;
  role: "admin";
  issuedAt: number;
}

export async function createAdminToken(username: string): Promise<string> {
  return new SignJWT({
    username,
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.role === "admin") {
      return payload as unknown as AdminSession;
    }
    return null;
  } catch {
    return null;
  }
}

export async function setAdminSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60, // 24 hours
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isCurrentAdmin(): Promise<boolean> {
  try {
    // 1. Check dedicated admin session cookie
    const cookieStore = await cookies();
    const adminToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (adminToken) {
      const verified = await verifyAdminToken(adminToken);
      if (verified && verified.role === "admin") {
        return true;
      }
    }

    // 2. Check if logged-in standard user has role === 'admin'
    const currentUser = await getCurrentUser();
    if (currentUser && currentUser.role === "admin") {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
