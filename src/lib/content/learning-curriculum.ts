import { LEVEL_1_QUESTIONS } from "./academy-levels/level-1";
import { LEVEL_2_QUESTIONS } from "./academy-levels/level-2";
import { LEVEL_3_QUESTIONS } from "./academy-levels/level-3";
import { LEVEL_4_QUESTIONS } from "./academy-levels/level-4";
import { LEVEL_5_QUESTIONS } from "./academy-levels/level-5";

export interface LearningQuestion {
  id: number;
  level: number;
  levelName: string;
  topic: string;
  badge: string;
  title: string;
  conceptSummary: string;
  conceptExample: string;
  task: string;
  starterSql: string;
  referenceSql: string;
  expectedColumns: string[];
  hint?: string;
  orderSensitive?: boolean;
  skipExactRowCheck?: boolean;
}

export const LEARNING_LEVELS = [
  { level: 1, name: "Level 1: Querying, Filtering & Hygiene", questionsCount: 20 },
  { level: 2, name: "Level 2: Strings, Dates, CASE & Aggregates", questionsCount: 20 },
  { level: 3, name: "Level 3: Joins, Subqueries & CTEs", questionsCount: 20 },
  { level: 4, name: "Level 4: Window Functions & Frame Clauses", questionsCount: 20 },
  { level: 5, name: "Level 5: Patterns & DB Engineering", questionsCount: 20 },
];

export const LEARNING_QUESTIONS: LearningQuestion[] = [
  ...LEVEL_1_QUESTIONS,
  ...LEVEL_2_QUESTIONS,
  ...LEVEL_3_QUESTIONS,
  ...LEVEL_4_QUESTIONS,
  ...LEVEL_5_QUESTIONS,
];
