import { QuestionDefinition, ECOM_L1_QUESTIONS } from "./ecom-l1-questions";
import { MULTI_DOMAIN_QUESTIONS } from "./multi-domain-questions";

/**
 * Universal Content Registry (Spec Section 6 & 13)
 * Provides questions, schemas, and datasets for all 7 industry domains and progressive levels.
 */

export function getQuestionsForDomainAndLevel(
  domain: string = "ecommerce",
  _level: number = 1
): QuestionDefinition[] {
  const norm = domain.toLowerCase();
  if (norm === "ecommerce" || norm === "ecom") {
    return ECOM_L1_QUESTIONS;
  }

  const list = MULTI_DOMAIN_QUESTIONS[norm];
  if (list && list.length > 0) {
    return list;
  }

  return ECOM_L1_QUESTIONS;
}

export function getQuestionById(id: string): QuestionDefinition | undefined {
  // Check E-Commerce first
  const ecom = ECOM_L1_QUESTIONS.find((q) => q.id === id);
  if (ecom) return ecom;

  // Search across other domains
  for (const domain of Object.keys(MULTI_DOMAIN_QUESTIONS)) {
    const found = MULTI_DOMAIN_QUESTIONS[domain].find((q) => q.id === id);
    if (found) return found;
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
