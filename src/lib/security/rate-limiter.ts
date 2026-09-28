/**
 * Rate Limiter for SQL Sandbox and Submission Protection (Spec Section 8, 10.3)
 * Protects database and execution sandbox against rapid automated requests or abuse.
 */

interface RateLimitEntry {
  lastActionTime: number;
  requestCount: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitResult {
  allowed: boolean;
  waitSeconds: number;
  reason?: string;
}

/**
 * Checks whether an action by a key (userId:action) is allowed
 * @param key unique identifier (e.g., `user_123:submit` or `ip_xxx:report`)
 * @param minIntervalSeconds minimum seconds between consecutive actions (default 5s)
 * @param maxBurst maximum actions allowed within the window (default 1)
 */
export function checkRateLimit(
  key: string,
  minIntervalSeconds: number = 5,
  maxBurst: number = 1
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry) {
    rateLimitStore.set(key, { lastActionTime: now, requestCount: 1 });
    return { allowed: true, waitSeconds: 0 };
  }

  const elapsedSeconds = (now - entry.lastActionTime) / 1000;

  if (elapsedSeconds < minIntervalSeconds) {
    if (entry.requestCount >= maxBurst) {
      const waitSeconds = Math.ceil(minIntervalSeconds - elapsedSeconds);
      return {
        allowed: false,
        waitSeconds,
        reason: `Rate limit exceeded. Please wait ${waitSeconds}s before trying again.`,
      };
    } else {
      entry.requestCount += 1;
      return { allowed: true, waitSeconds: 0 };
    }
  }

  // Reset window
  entry.lastActionTime = now;
  entry.requestCount = 1;
  return { allowed: true, waitSeconds: 0 };
}

/**
 * Resets rate limit for a specific key (useful in tests)
 */
export function resetRateLimit(key?: string) {
  if (key) {
    rateLimitStore.delete(key);
  } else {
    rateLimitStore.clear();
  }
}
