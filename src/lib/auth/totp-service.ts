import crypto from "crypto";
import { safeReadJson, safeWriteJson } from "@/lib/storage/file-storage";

// Base32 character set (RFC 4648)
const BASE32_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function base32Encode(buffer: Buffer): string {
  let bits = 0;
  let value = 0;
  let output = "";

  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i];
    bits += 8;

    while (bits >= 5) {
      output += BASE32_CHARS[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_CHARS[(value << (5 - bits)) & 31];
  }

  return output;
}

export function base32Decode(base32: string): Buffer {
  const clean = base32.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];

  for (let i = 0; i < clean.length; i++) {
    const idx = BASE32_CHARS.indexOf(clean[i]);
    if (idx === -1) continue;

    value = (value << 5) | idx;
    bits += 5;

    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(bytes);
}

/**
 * Generate a random Base32 secret for Google Authenticator (160-bit key)
 */
export function generateTotpSecret(): string {
  const buffer = crypto.randomBytes(20);
  return base32Encode(buffer);
}

/**
 * Compute the 6-digit TOTP code for a secret at a given timestamp offset
 */
export function generateTotpCode(secret: string, timeOffsetSteps: number = 0): string {
  const key = base32Decode(secret);
  const epoch = Math.floor(Date.now() / 1000);
  const timeStep = Math.floor(epoch / 30) + timeOffsetSteps;

  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigInt64BE(BigInt(timeStep), 0);

  const hmac = crypto.createHmac("sha1", key);
  hmac.update(counterBuffer);
  const digest = hmac.digest();

  const offset = digest[digest.length - 1] & 0x0f;
  const code =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  return (code % 1000000).toString().padStart(6, "0");
}

/**
 * Verify a 6-digit TOTP code with time drift window tolerance (-1, 0, +1 step = +-30s)
 */
export function verifyTotpCode(secret: string, token: string, window: number = 1): boolean {
  if (!secret || !token) return false;
  const cleanToken = token.trim();
  if (cleanToken.length !== 6) return false;

  for (let errorWindow = -window; errorWindow <= window; errorWindow++) {
    const expected = generateTotpCode(secret, errorWindow);
    if (expected === cleanToken) {
      return true;
    }
  }
  return false;
}

/**
 * Build standard otpauth URI for Google Authenticator QR Code
 */
export function getTotpUri(username: string, secret: string, issuer: string = "SQL Office Simulator"): string {
  const cleanIssuer = encodeURIComponent(issuer);
  const cleanUser = encodeURIComponent(username);
  return `otpauth://totp/${cleanIssuer}:${cleanUser}?secret=${secret}&issuer=${cleanIssuer}&algorithm=SHA1&digits=6&period=30`;
}

/**
 * Generate 8 emergency backup codes
 */
export function generateBackupCodes(count: number = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const part1 = crypto.randomBytes(2).toString("hex").toUpperCase();
    const part2 = crypto.randomBytes(2).toString("hex").toUpperCase();
    codes.push(`${part1}-${part2}`);
  }
  return codes;
}

// ==========================================
// Admin 2FA Settings Persistence
// ==========================================
const CONFIG_FILENAME = "admin-2fa.json";

export interface Admin2FAConfig {
  enabled: boolean;
  secret: string;
  backupCodes: string[];
  createdAt: string;
  lastVerifiedAt?: string;
}

export function getAdmin2FAConfig(): Admin2FAConfig {
  const existing = safeReadJson<Admin2FAConfig | null>(CONFIG_FILENAME, null);
  if (existing && existing.secret) {
    return existing;
  }

  // Initial un-enabled config
  const initial: Admin2FAConfig = {
    enabled: false,
    secret: generateTotpSecret(),
    backupCodes: generateBackupCodes(8),
    createdAt: new Date().toISOString(),
  };
  safeWriteJson(CONFIG_FILENAME, initial);
  return initial;
}

export function saveAdmin2FAConfig(config: Admin2FAConfig) {
  safeWriteJson(CONFIG_FILENAME, config);
}

export function verifyAdminBackupCode(code: string): boolean {
  const config = getAdmin2FAConfig();
  const clean = code.trim().toUpperCase();
  const index = config.backupCodes.findIndex((c) => c.toUpperCase() === clean);
  if (index !== -1) {
    // Consume used backup code
    config.backupCodes.splice(index, 1);
    saveAdmin2FAConfig(config);
    return true;
  }
  return false;
}
