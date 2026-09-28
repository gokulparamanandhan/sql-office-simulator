import { appDb } from "@/lib/db/app-db";

/**
 * SQL Office Simulator - Application Configuration Manager (Spec Section 2, 6, 9.7)
 * Configurable parameters:
 * - unlock_rule: min_solved, min_boss_solved
 * - hint_penalty_pct: 0.25 (25% per hint)
 * - max_attempts_before_solution: 3
 * - rate_limit_seconds: 5
 */

export interface UnlockRuleConfig {
  minSolved: number;
  minBossSolved: number;
  hintPenaltyPct: number;
  maxAttemptsBeforeSolution: number;
  rateLimitSeconds: number;
  reportAutoHideThreshold: number;
}

const DEFAULT_CONFIG: UnlockRuleConfig = {
  minSolved: 70, // Spec Section 2: >= 70 of 100
  minBossSolved: 5, // Spec Section 2: >= 5 of 10 boss
  hintPenaltyPct: 0.25,
  maxAttemptsBeforeSolution: 3,
  rateLimitSeconds: 5,
  reportAutoHideThreshold: 3,
};

// In-memory / cache fallback for fast evaluation
let cachedConfig: UnlockRuleConfig = { ...DEFAULT_CONFIG };

export async function getAppConfig(): Promise<UnlockRuleConfig> {
  try {
    const record = await appDb.appConfig.findUnique({
      where: { key: "unlock_rule" },
    });
    if (record && record.valueJson) {
      const json = record.valueJson as Record<string, number>;
      cachedConfig = {
        minSolved: json.min_solved ?? DEFAULT_CONFIG.minSolved,
        minBossSolved: json.min_boss_solved ?? DEFAULT_CONFIG.minBossSolved,
        hintPenaltyPct: json.hint_penalty_pct ?? DEFAULT_CONFIG.hintPenaltyPct,
        maxAttemptsBeforeSolution:
          json.max_attempts_before_solution ?? DEFAULT_CONFIG.maxAttemptsBeforeSolution,
        rateLimitSeconds: json.rate_limit_seconds ?? DEFAULT_CONFIG.rateLimitSeconds,
        reportAutoHideThreshold:
          json.report_auto_hide_threshold ?? DEFAULT_CONFIG.reportAutoHideThreshold,
      };
    }
  } catch {
    // Database offline or fallback
  }
  return cachedConfig;
}

export async function updateAppConfig(
  newConfig: Partial<UnlockRuleConfig>
): Promise<UnlockRuleConfig> {
  cachedConfig = {
    ...cachedConfig,
    ...newConfig,
  };

  try {
    await appDb.appConfig.upsert({
      where: { key: "unlock_rule" },
      update: {
        valueJson: {
          min_solved: cachedConfig.minSolved,
          min_boss_solved: cachedConfig.minBossSolved,
          hint_penalty_pct: cachedConfig.hintPenaltyPct,
          max_attempts_before_solution: cachedConfig.maxAttemptsBeforeSolution,
          rate_limit_seconds: cachedConfig.rateLimitSeconds,
          report_auto_hide_threshold: cachedConfig.reportAutoHideThreshold,
        },
      },
      create: {
        key: "unlock_rule",
        valueJson: {
          min_solved: cachedConfig.minSolved,
          min_boss_solved: cachedConfig.minBossSolved,
          hint_penalty_pct: cachedConfig.hintPenaltyPct,
          max_attempts_before_solution: cachedConfig.maxAttemptsBeforeSolution,
          rate_limit_seconds: cachedConfig.rateLimitSeconds,
          report_auto_hide_threshold: cachedConfig.reportAutoHideThreshold,
        },
      },
    });
  } catch {
    // Local memory update
  }

  return cachedConfig;
}

/**
 * Evaluates whether next level should be unlocked based on solved counts
 */
export function isLevelUnlocked(
  solvedCount: number,
  bossSolvedCount: number,
  config: UnlockRuleConfig = cachedConfig,
  totalQuestionsInLevel: number = 100
): { unlocked: boolean; progressPct: number; reason?: string } {
  // If sample set has fewer questions (e.g. 10 questions in vertical slice)
  const effectiveMinSolved =
    totalQuestionsInLevel <= 10
      ? Math.min(config.minSolved, 7) // 7/10 for sample slice
      : config.minSolved;

  const effectiveMinBoss =
    totalQuestionsInLevel <= 10
      ? Math.min(config.minBossSolved, 1) // 1 boss question in sample slice
      : config.minBossSolved;

  const solvedQualified = solvedCount >= effectiveMinSolved;
  const bossQualified = bossSolvedCount >= effectiveMinBoss;
  const unlocked = solvedQualified && bossQualified;

  const progressPct = Math.min(
    Math.round((solvedCount / effectiveMinSolved) * 100),
    100
  );

  let reason = undefined;
  if (!unlocked) {
    if (!solvedQualified && !bossQualified) {
      reason = `Requires ${effectiveMinSolved - solvedCount} more solved questions and ${effectiveMinBoss - bossSolvedCount} more boss question(s).`;
    } else if (!solvedQualified) {
      reason = `Requires ${effectiveMinSolved - solvedCount} more solved questions.`;
    } else {
      reason = `Requires ${effectiveMinBoss - bossSolvedCount} more boss question(s).`;
    }
  }

  return { unlocked, progressPct, reason };
}
