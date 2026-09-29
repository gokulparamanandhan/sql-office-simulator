/**
 * Curated, catchy, inspiring quotes for data engineers and SQL analysts.
 * Replaces repetitive placeholders with unique, authentic wisdom.
 */

export interface OfficeQuote {
  quote: string;
  author: string;
}

export const WORKSPACE_QUOTES: OfficeQuote[] = [
  {
    quote: "In God we trust. All others must bring clean data.",
    author: "W. Edwards Deming",
  },
  {
    quote: "Think in sets, filter early, and let the database do the heavy lifting.",
    author: "SQL Engineering Rule #1",
  },
  {
    quote: "Data matures like wine; unverified assumptions age like fish.",
    author: "Jeff Hammerbacher",
  },
  {
    quote: "First make the query correct, then make the query fast.",
    author: "Database Performance Principle",
  },
  {
    quote: "Without data you're just another person with an opinion.",
    author: "W. Edwards Deming",
  },
  {
    quote: "Every query tells a company's financial story. Write it with precision.",
    author: "Data Office Standard",
  },
  {
    quote: "Clean SQL turns business chaos into executive clarity.",
    author: "Analytics Core",
  },
  {
    quote: "Curiosity plus proper indexing unlocks answers in milliseconds.",
    author: "Database Architecture Axiom",
  },
];

export const SCRATCHPAD_TIP = "First map the schema relationships, then let your SELECT statement tell the story.";

export const DASHBOARD_QUOTE: OfficeQuote = {
  quote: "Mastering SQL gives you a direct, unfiltered conversation with business reality.",
  author: "The SQL Office Career Simulator",
};

export const LEVEL_PAGE_QUOTE: OfficeQuote = {
  quote: "Real data analysts don't wait for answers—they query the truth directly.",
  author: "SQL Office Simulator",
};

export const PROGRESS_PAGE_QUOTE: OfficeQuote = {
  quote: "Consistency turns raw queries into senior-level engineering instinct.",
  author: "Data Career Progression",
};
