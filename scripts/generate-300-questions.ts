import fs from "fs";
import path from "path";
import { getBasicQuestions } from "./questions-data-basic";
import { getIntermediateQuestions } from "./questions-data-intermediate";
import { getAdvancedQuestions } from "./questions-data-advanced";
import { InterviewQuestion } from "../src/lib/content/interview-questions";

function main() {
  console.log("Generating 300 High-Quality MAANG Interview Questions...");
  const basic = getBasicQuestions();
  const intermediate = getIntermediateQuestions();
  const advanced = getAdvancedQuestions();

  console.log(`- Level 1 (Basic): ${basic.length} questions`);
  console.log(`- Level 2 (Intermediate): ${intermediate.length} questions`);
  console.log(`- Level 3 (Advanced): ${advanced.length} questions`);

  if (basic.length !== 100 || intermediate.length !== 100 || advanced.length !== 100) {
    throw new Error(`Invalid counts: Basic=${basic.length}, Intermediate=${intermediate.length}, Advanced=${advanced.length}`);
  }

  const all: InterviewQuestion[] = [...basic, ...intermediate, ...advanced];

  const targetPath = path.join(__dirname, "../src/lib/content/interview-questions.ts");

  const fileContent = `import type { ConceptPrimer, RampStep } from "../interview/sql-learning-helpers";

export type { ConceptPrimer, RampStep };

export interface InterviewQuestion {
  id: string;
  number: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  companies: string[];
  topics: string[];
  frequency: "Very High" | "High" | "Medium";
  category: "Aggregations" | "Window Functions" | "Cohorts & Retention" | "Joins & Set Theory" | "Gaps & Islands" | "Business Analytics" | "Advanced SQL";
  description: string;
  schemaSql: string;
  hiddenTestSql?: string;
  starterSql: string;
  referenceSql: string;
  expectedColumns: string[];
  hints: string[];
  explanation: string;
  orderSensitive?: boolean;
  stage?: string;
  stageOrder?: number;
  rampStep?: RampStep;
  patternTag?: string;
  conceptPrimer?: ConceptPrimer;
  blueprintSql?: string;
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = ${JSON.stringify(all, null, 2)};

export function getInterviewQuestionById(id: string): InterviewQuestion | undefined {
  return INTERVIEW_QUESTIONS.find((q) => q.id.toLowerCase() === id.toLowerCase());
}

export const INTERVIEW_COMPANIES = Array.from(
  new Set(INTERVIEW_QUESTIONS.flatMap((q) => q.companies))
).sort();

export const INTERVIEW_CATEGORIES = Array.from(
  new Set(INTERVIEW_QUESTIONS.map((q) => q.category))
).sort();
`;

  fs.writeFileSync(targetPath, fileContent, "utf-8");
  console.log(`Successfully wrote ${all.length} questions to ${targetPath}`);
}

main();
