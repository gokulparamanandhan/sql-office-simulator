import fs from "fs";
import path from "path";
import os from "os";

// Module-level in-memory cache to guarantee persistence within container lifecycles
// and prevent hard failures if the filesystem is completely read-only
const memoryStore = new Map<string, any>();

/**
 * Returns whether the current runtime is a serverless environment (e.g. Vercel, AWS Lambda)
 */
export function isServerlessEnvironment(): boolean {
  return Boolean(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.LAMBDA_TASK_ROOT ||
    process.env.NETLIFY ||
    process.env.NODE_ENV === "production"
  );
}

/**
 * Returns a serverless-safe file path.
 * On Vercel / AWS Lambda, the root filesystem (/var/task) is read-only, so we use os.tmpdir().
 * In local development, we use the local /data directory.
 */
export function getSafeFilePath(filename: string): string {
  if (isServerlessEnvironment()) {
    return path.join(os.tmpdir(), "sql-office", filename);
  }
  return path.join(process.cwd(), "data", filename);
}

export function safeReadJson<T>(filename: string, defaultValue: T): T {
  // 1. Check in-memory store
  if (memoryStore.has(filename)) {
    return memoryStore.get(filename) as T;
  }

  // 2. Check safe file path (os.tmpdir() or /data)
  const safePath = getSafeFilePath(filename);
  try {
    if (fs.existsSync(safePath)) {
      const data = fs.readFileSync(safePath, "utf-8");
      const parsed = JSON.parse(data) as T;
      memoryStore.set(filename, parsed);
      return parsed;
    }
  } catch {
    // Continue to next check
  }

  // 3. Fallback: check flat tmp file in os.tmpdir()
  try {
    const flatTmpPath = path.join(os.tmpdir(), filename);
    if (fs.existsSync(flatTmpPath)) {
      const data = fs.readFileSync(flatTmpPath, "utf-8");
      const parsed = JSON.parse(data) as T;
      memoryStore.set(filename, parsed);
      return parsed;
    }
  } catch {
    // Continue to next check
  }

  // 4. Fallback: check project /data directory if different
  const localDataPath = path.join(process.cwd(), "data", filename);
  if (safePath !== localDataPath) {
    try {
      if (fs.existsSync(localDataPath)) {
        const data = fs.readFileSync(localDataPath, "utf-8");
        const parsed = JSON.parse(data) as T;
        memoryStore.set(filename, parsed);
        return parsed;
      }
    } catch {
      // Ignore
    }
  }

  // 5. Return default and cache it
  memoryStore.set(filename, defaultValue);
  return defaultValue;
}

export function safeWriteJson<T>(filename: string, data: T): boolean {
  // Always update in-memory store immediately
  memoryStore.set(filename, data);

  const safePath = getSafeFilePath(filename);
  try {
    const dir = path.dirname(safePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(safePath, JSON.stringify(data, null, 2));
    return true;
  } catch {
    // Fallback: try root tmp directory
    try {
      const flatTmpPath = path.join(os.tmpdir(), filename);
      fs.writeFileSync(flatTmpPath, JSON.stringify(data, null, 2));
      return true;
    } catch {
      // In-memory fallback succeeded, no throw
      return false;
    }
  }
}
