import {
  calculateXp,
  updateStreak,
  evaluateBadges,
  analyzeConceptMastery,
  getCareerProgression,
} from "../src/lib/gamification/gamification-service";
import { isLevelUnlocked } from "../src/lib/config/app-config";

let testsRun = 0;
let testsPassed = 0;

function assert(condition: boolean, name: string) {
  testsRun++;
  if (condition) {
    testsPassed++;
    console.log(`  ✓ ${name}`);
  } else {
    console.error(`  ✗ FAIL: ${name}`);
    process.exitCode = 1;
  }
}

console.log("=== Testing Gamification & Unlock Logic (Phase 4) ===");

// 1. XP Calculation
console.log("\n[1] Testing calculateXp (Spec Section 9.4):");
assert(calculateXp(10, 0, false) === 10, "Base 10 XP with 0 hints yields 10 XP (100%)");
assert(calculateXp(10, 1, false) === 8, "Base 10 XP with 1 hint yields 8 XP (75% -> rounded 8)");
assert(calculateXp(10, 2, false) === 5, "Base 10 XP with 2 hints yields 5 XP (50%)");
assert(calculateXp(10, 3, false) === 3, "Base 10 XP with 3 hints yields 3 XP (25% -> rounded 3)");
assert(calculateXp(10, 0, true) === 0, "Solution viewed before solving yields 0 XP");
assert(calculateXp(20, 2, false) === 10, "Boss question 20 XP with 2 hints yields 10 XP");

// 2. Unlock Rules (Spec Section 2 & Section 6)
console.log("\n[2] Testing isLevelUnlocked:");
const testConfig = {
  minSolved: 70,
  minBossSolved: 5,
  hintPenaltyPct: 0.25,
  maxAttemptsBeforeSolution: 3,
  rateLimitSeconds: 5,
};

// For 100 question levels:
assert(!isLevelUnlocked(69, 5, testConfig, 100).unlocked, "Full level: 69/100 solved is locked (<70)");
assert(!isLevelUnlocked(75, 4, testConfig, 100).unlocked, "Full level: 75/100 solved but only 4/5 boss is locked");
assert(isLevelUnlocked(70, 5, testConfig, 100).unlocked, "Full level: 70/100 solved and 5/5 boss is UNLOCKED");
assert(isLevelUnlocked(85, 8, testConfig, 100).unlocked, "Full level: 85/100 solved and 8/5 boss is UNLOCKED");

// For 10 question vertical slice:
assert(!isLevelUnlocked(6, 1, testConfig, 10).unlocked, "Sample slice: 6/10 solved is locked (<7)");
assert(!isLevelUnlocked(7, 0, testConfig, 10).unlocked, "Sample slice: 7/10 solved with 0 boss is locked (<1 boss)");
assert(isLevelUnlocked(7, 1, testConfig, 10).unlocked, "Sample slice: 7/10 solved with 1 boss is UNLOCKED");

// 3. Streak Tracking
console.log("\n[3] Testing updateStreak:");
const firstDay = updateStreak(0, 0, null);
assert(firstDay.currentStreak === 1 && firstDay.longestStreak === 1, "New user gets streak 1");

const sameDay = updateStreak(1, 1, new Date().toISOString());
assert(sameDay.currentStreak === 1, "Same day activity keeps streak at 1");

const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
const consecutiveDay = updateStreak(1, 1, yesterday);
assert(consecutiveDay.currentStreak === 2 && consecutiveDay.longestStreak === 2, "Consecutive day increments streak to 2");

const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
const brokenStreak = updateStreak(5, 5, threeDaysAgo);
assert(brokenStreak.currentStreak === 1 && brokenStreak.longestStreak === 5, "Missed days resets streak to 1 but keeps longestStreak 5");

// 4. Badges Evaluation
console.log("\n[4] Testing evaluateBadges:");
const earnedBadges = evaluateBadges(
  {
    totalQueries: 1,
    consecutiveCorrect: 10,
    hintsUsedInLevel: 0,
    levelCompleted: true,
    bossQuestionsSolved: 1,
    levelsCompletedInDomain: 5,
  },
  new Set(["first-query"]) // first-query already earned
);

assert(!earnedBadges.includes("first-query"), "Already earned badge is not re-awarded");
assert(earnedBadges.includes("ten-in-a-row"), "Earned 'ten-in-a-row' for 10 consecutive correct");
assert(earnedBadges.includes("no-hints-level"), "Earned 'no-hints-level'");
assert(earnedBadges.includes("boss-slayer"), "Earned 'boss-slayer'");
assert(earnedBadges.includes("domain-master"), "Earned 'domain-master'");

// 5. Concept Mastery & Weak Areas
console.log("\n[5] Testing analyzeConceptMastery:");
const mockAttempts = [
  { concepts: ["SELECT", "WHERE"], isCorrect: true },
  { concepts: ["SELECT", "WHERE"], isCorrect: true },
  { concepts: ["JOIN", "GROUP BY"], isCorrect: false },
  { concepts: ["JOIN", "GROUP BY"], isCorrect: false },
  { concepts: ["JOIN"], isCorrect: true },
];

const { mastery, weakAreas } = analyzeConceptMastery(mockAttempts);
const selectStat = mastery.find((m) => m.concept === "SELECT");
assert(selectStat?.accuracyPct === 100, "SELECT concept accuracy is 100%");

const groupByStat = mastery.find((m) => m.concept === "GROUP BY");
assert(groupByStat?.accuracyPct === 0, "GROUP BY concept accuracy is 0%");
assert(weakAreas.includes("GROUP BY"), "GROUP BY is identified as a weak area (< 70% accuracy)");
assert(!weakAreas.includes("SELECT"), "SELECT is not identified as a weak area");

// 6. Career Progression & XP Milestones
console.log("\n[6] Testing getCareerProgression & calculateCareerRank:");
const p0 = getCareerProgression(0);
assert(p0.currentLevel === 1 && p0.currentRank === "Intern (Solo Data Hire)" && p0.nextLevelXp === 500 && p0.nextLevel === 2, "0 XP is Level 1 Intern, next milestone 500 XP");

const p543 = getCareerProgression(543);
assert(
  p543.currentLevel === 2 &&
  p543.currentRank === "Data Analyst" &&
  p543.nextLevelXp === 2000 &&
  p543.nextLevel === 3 &&
  p543.xpToNextMilestone === 1457 &&
  p543.progressPct === 3,
  "543 XP is Level 2 Data Analyst progressing to Level 3 (2000 XP milestone, 1457 remaining, 3% progress)"
);

const p2050 = getCareerProgression(2050);
assert(p2050.currentLevel === 3 && p2050.currentRank === "Senior Data Analyst" && p2050.nextLevelXp === 5000, "2050 XP is Level 3 Senior Data Analyst, next milestone 5000 XP");

const p5000 = getCareerProgression(5000);
assert(p5000.currentLevel === 4 && p5000.currentRank === "Data Lead" && p5000.nextLevelXp === 10000, "5000 XP is Level 4 Data Lead, next milestone 10000 XP");

const p10000 = getCareerProgression(10000);
assert(p10000.currentLevel === 5 && p10000.isMaxLevel && p10000.currentRank === "Head of Data / Chief Analytics Officer", "10000 XP is Max Level 5 Head of Data");

// Test streak calculation on fifth day with account created 5 days ago
const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();
const userDay5 = updateStreak(1, 1, null, {
  createdAtStr: fiveDaysAgo,
  totalXp: 543,
});
assert(userDay5.currentStreak === 5 && userDay5.longestStreak === 5, "User active on fifth day with 543 XP gets 5 Day Streak");

console.log(`\n========================================`);
console.log(`Results: ${testsPassed}/${testsRun} tests passed.`);
if (testsPassed === testsRun) {
  console.log("All Phase 4 Gamification & Unlock tests passed successfully!\n");
}
