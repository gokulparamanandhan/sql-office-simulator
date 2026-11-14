export interface BadgeDefinition {
  slug: string;
  name: string;
  tierLevel?: 1 | 2 | 3 | "master";
  description: string;
  icon: string;
  category: "level" | "skill" | "streak" | "special";
  accentColor: string;
  requirement: string;
}

export const BADGES_DATA: BadgeDefinition[] = [
  // Dedicated Badges for Each Level (Core Requirement)
  {
    slug: "mud-scrapper",
    name: "The Mud Scrapper",
    tierLevel: 1,
    description: "Conquered 100 messy questions in Tier 1: Basic. Mastered SELECT, dirty JOINs, NULL handling, and deduplication.",
    icon: "🚜",
    category: "level",
    accentColor: "bg-emerald-400 text-black border-black",
    requirement: "Complete all 100 questions in Level 1 (Basic)",
  },
  {
    slug: "window-wizard",
    name: "The Window Wizard",
    tierLevel: 2,
    description: "Conquered 100 questions in Tier 2: Intermediate. Mastered CTEs, DENSE_RANK, LEAD, LAG, and rolling metrics without breaking a sweat.",
    icon: "🧙‍♂️",
    category: "level",
    accentColor: "bg-amber-300 text-black border-black",
    requirement: "Complete all 100 questions in Level 2 (Intermediate)",
  },
  {
    slug: "schema-exorcist",
    name: "The Schema Exorcist",
    tierLevel: 3,
    description: "Conquered 100 questions in Tier 3: Advanced. Banished demons from nightmare production schemas, recursive CTEs, and sessionization.",
    icon: "👹",
    category: "level",
    accentColor: "bg-rose-500 text-white border-black",
    requirement: "Complete all 100 questions in Level 3 (Advanced)",
  },
  {
    slug: "sql-demigod",
    name: "SQL Demigod",
    tierLevel: "master",
    description: "Completed all 300 dirty production levels. Ready to crack ANY SQL interview in the world (MAANG, Startups, Hedge Funds).",
    icon: "⚡",
    category: "special",
    accentColor: "bg-purple-500 text-white border-black shadow-[4px_4px_0px_#FFE600]",
    requirement: "Complete all 300 levels (100% Curriculum Mastery)",
  },

  // Milestone / Skill Badges
  {
    slug: "dirty-data-survivor",
    name: "Dirty Data Survivor",
    description: "Solved your first query with missing values, whitespace traps, and NULL foreign keys.",
    icon: "🧽",
    category: "skill",
    accentColor: "bg-cyan-300 text-black border-black",
    requirement: "Solve your first messy SQL challenge",
  },
  {
    slug: "maang-hunter",
    name: "MAANG Hunter",
    description: "Passed 10 authentic technical interview questions asked at Meta, Amazon, Apple, Netflix, or Google.",
    icon: "🎯",
    category: "skill",
    accentColor: "bg-blue-400 text-black border-black",
    requirement: "Solve 10 questions tagged with MAANG companies",
  },
  {
    slug: "zero-hint-purist",
    name: "Zero Hint Purist",
    description: "Solved 25 intermediate or advanced challenges without viewing a single hint or solution.",
    icon: "🧠",
    category: "skill",
    accentColor: "bg-fuchsia-400 text-black border-black",
    requirement: "Solve 25 challenges without opening hints",
  },
  {
    slug: "fanout-fighter",
    name: "Fanout Fighter",
    description: "Successfully stopped a one-to-many JOIN from duplicating row totals by writing pre-aggregated CTEs.",
    icon: "🛡️",
    category: "skill",
    accentColor: "bg-lime-400 text-black border-black",
    requirement: "Pass the fanout prevention benchmark query",
  },
  {
    slug: "seven-day-streak",
    name: "Unstoppable Momentum",
    description: "Maintained a 7-day query solving streak.",
    icon: "🔥",
    category: "streak",
    accentColor: "bg-orange-400 text-black border-black",
    requirement: "Keep a 7-day active daily streak",
  },
  {
    slug: "recursive-voyager",
    name: "Recursive Voyager",
    description: "Successfully traversed an enterprise org tree using a recursive CTE without hitting infinite loops.",
    icon: "🌳",
    category: "skill",
    accentColor: "bg-teal-300 text-black border-black",
    requirement: "Complete a Level 3 Recursive CTE problem",
  },
];
