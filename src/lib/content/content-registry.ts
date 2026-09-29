import { QuestionDefinition, ECOM_L1_QUESTIONS } from "./ecom-l1-questions";
import { generateDomainLevelQuestions } from "./universal-domain-generator";

/**
 * Universal Content Registry (Spec Section 6 & 13)
 * Provides 100 questions for EVERY level (Levels 1 to 5) across ALL 7 industry domains.
 * Total curriculum size: 7 domains × 5 levels × 100 questions = 3,500 questions.
 */

const PREFIX_TO_DOMAIN: Record<string, string> = {
  ecom: "ecommerce",
  hc: "healthcare",
  fin: "finance",
  hr: "hr",
  log: "logistics",
  rest: "restaurants",
  saas: "saas",
};

export function getQuestionsForDomainAndLevel(
  domain: string = "ecommerce",
  level: number = 1
): QuestionDefinition[] {
  const normDomain = (domain || "ecommerce").toLowerCase().replace(/^ecom$/, "ecommerce");
  const validLevel = Math.max(1, Math.min(5, isNaN(level) || !level ? 1 : Number(level)));

  return generateDomainLevelQuestions(normDomain, validLevel);
}

export function getQuestionById(id: string): QuestionDefinition | undefined {
  if (!id) return undefined;

  // 1. Fast path for E-Commerce Level 1 curated questions
  const ecom = ECOM_L1_QUESTIONS.find((q) => q.id === id);
  if (ecom) return ecom;

  // 2. Structured pattern parser: `${prefix}-L${level}-${order}`
  const match = id.match(/^([a-z]+)-L([1-5])-(\d+)$/i);
  if (match) {
    const prefix = match[1].toLowerCase();
    const lvl = parseInt(match[2], 10);
    const domain = PREFIX_TO_DOMAIN[prefix] || prefix;

    const domainQuestions = generateDomainLevelQuestions(domain, lvl);
    const found = domainQuestions.find((q) => q.id.toLowerCase() === id.toLowerCase());
    if (found) return found;
  }

  // 3. Fallback: Search across all domains for Level 1
  for (const domain of getAllSupportedDomains()) {
    for (let lvl = 1; lvl <= 5; lvl++) {
      const questions = generateDomainLevelQuestions(domain, lvl);
      const found = questions.find((q) => q.id.toLowerCase() === id.toLowerCase());
      if (found) return found;
    }
  }

  return undefined;
}

export function getAllSupportedDomains(): string[] {
  return [
    "ecommerce",
    "healthcare",
    "finance",
    "hr",
    "logistics",
    "restaurants",
    "saas",
  ];
}
