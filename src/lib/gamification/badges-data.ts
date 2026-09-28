export interface BadgeDefinition {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const BADGES_DATA: BadgeDefinition[] = [
  {
    slug: "first-query",
    name: "First Day on the Job",
    description: "Executed your first SQL query in the workplace.",
    icon: "Play",
  },
  {
    slug: "ten-in-a-row",
    name: "Hot Streak",
    description: "Solved 10 consecutive requests without a syntax error.",
    icon: "Flame",
  },
  {
    slug: "no-hints-level",
    name: "Pure Analyst",
    description: "Cleared an entire level without requesting a single hint.",
    icon: "Award",
  },
  {
    slug: "boss-slayer",
    name: "Executive Briefing",
    description: "Solved 5 boss questions in a single company level.",
    icon: "Crown",
  },
  {
    slug: "domain-master",
    name: "Industry Specialist",
    description: "Cleared all 5 company stages in a single domain.",
    icon: "Briefcase",
  },
  {
    slug: "grandmaster",
    name: "Chief Data Officer",
    description: "Conquered all 7 domains across all 35 levels.",
    icon: "Trophy",
  },
];
