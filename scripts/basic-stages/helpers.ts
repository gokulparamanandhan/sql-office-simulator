import type { InterviewQuestion, ConceptPrimer, RampStep } from "../../src/lib/content/interview-questions";

export interface BasicQuestionInput {
  number: number;
  titleBody: string; // e.g. "Netflix: Top 5 Longest 4K Ultra-HD Movies"
  companies: string[];
  topics: string[];
  frequency?: "Very High" | "High" | "Medium";
  category: InterviewQuestion["category"];
  stage: string;
  stageOrder: number;
  rampStep: RampStep;
  patternTag: string;
  description: string;
  schemaSql: string;
  referenceSql: string;
  expectedColumns: string[];
  hints: string[];
  explanation: string;
  starterSql?: string;
  blueprintSql?: string;
  conceptPrimer?: ConceptPrimer;
  hiddenTestSql?: string;
}

export function makeBasicQ(input: BasicQuestionInput): InterviewQuestion {
  const padded = String(input.number).padStart(3, "0");
  const fullTitle = `${input.number}. ${input.titleBody}`;
  const starterSql =
    input.starterSql ??
    `-- ${fullTitle}\n-- Output: ${input.expectedColumns.join(", ")}\nSELECT\n  -- Your code here\n;`;

  return {
    id: `basic-${padded}`,
    number: input.number,
    title: fullTitle,
    difficulty: "Easy",
    companies: input.companies,
    topics: input.topics,
    frequency: input.frequency ?? "Very High",
    category: input.category,
    orderSensitive: true,
    stage: input.stage,
    stageOrder: input.stageOrder,
    rampStep: input.rampStep,
    patternTag: input.patternTag,
    description: input.description,
    schemaSql: input.schemaSql,
    hiddenTestSql: input.hiddenTestSql,
    starterSql,
    referenceSql: input.referenceSql,
    expectedColumns: input.expectedColumns,
    hints: input.hints,
    explanation: input.explanation,
    conceptPrimer: input.conceptPrimer,
    blueprintSql: input.blueprintSql,
  };
}
