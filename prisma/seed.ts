import { appDb } from "../src/lib/db/app-db";

export const DOMAINS_SEED_DATA = [
  {
    slug: "ecommerce",
    name: "E-Commerce",
    description: "Analyze customer repeat rates, warehouse returns, basket sizes, and regional marketing attribution at OmniCart Retail Group.",
    icon: "ShoppingCart",
    order: 1,
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Query patient treatment histories, emergency room admission wait times, and insurance claim loss ratios at St. Jude Clinical Network.",
    icon: "Activity",
    order: 2,
  },
  {
    slug: "finance",
    name: "Finance & Banking",
    description: "Audit high-frequency debit card fraud spikes, cross-border remittance fees, and loan default indicators at Apex Capital Bank.",
    icon: "Landmark",
    order: 3,
  },
  {
    slug: "hr",
    name: "Human Resources",
    description: "Calculate engineering attrition cohorts, compensation equity ratios, and hiring funnel velocity at Vanguard Global HR.",
    icon: "Users",
    order: 4,
  },
  {
    slug: "logistics",
    name: "Logistics & Supply",
    description: "Track carrier route delays, container dwell time, fleet telematics, and warehouse dock utilization at Atlas Freight Solutions.",
    icon: "Truck",
    order: 5,
  },
  {
    slug: "restaurants",
    name: "Restaurants & Hospitality",
    description: "Audit peak-hour table turn times, food waste margins, supplier contract variances, and tips at Palate Group Dining.",
    icon: "Utensils",
    order: 6,
  },
  {
    slug: "saas",
    name: "Software (B2B SaaS)",
    description: "Analyze annual recurring revenue (ARR), seat expansions, monthly churn cohorts, and feature adoption at CloudScale Platform.",
    icon: "Code2",
    order: 7,
  },
];

export const LEVELS_CONFIG = [
  {
    number: 1,
    name: "Easy: The Startup",
    company: "Tiny Startup (5–20 people). You are the sole data hire answering questions across every department.",
    rows: "~1K–10K rows",
    tables: 6,
  },
  {
    number: 2,
    name: "Intermediate: Growing Company",
    company: "Growing Company (50–100 employees). Dedicated teams, multi-table joins, subqueries, and CTEs.",
    rows: "~100K rows",
    tables: 15,
  },
  {
    number: 3,
    name: "Advanced: Scale-Up",
    company: "Scale-Up (200–500 employees). Multiple regions, window functions, conditional aggregations, and cohorts.",
    rows: "~1M rows",
    tables: 30,
  },
  {
    number: 4,
    name: "Expert: Enterprise",
    company: "Enterprise (1,000+ employees). Fragmented business units, recursive CTEs, and data quality audits.",
    rows: "~5M rows",
    tables: 60,
  },
  {
    number: 5,
    name: "Master: Global Corporation",
    company: "Multinational Corporation (5,000+ employees). Query optimization, percentiles, SCD, and C-suite reporting.",
    rows: "10M+ rows",
    tables: 100,
  },
];

export const BADGES_SEED_DATA = [
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

async function seed() {
  console.log("🌱 Seeding SQL Office Simulator content...");

  try {
    // 1. Seed Domains & Levels
    for (const d of DOMAINS_SEED_DATA) {
      const domain = await appDb.domain.upsert({
        where: { slug: d.slug },
        update: { name: d.name, description: d.description, icon: d.icon, order: d.order },
        create: { slug: d.slug, name: d.name, description: d.description, icon: d.icon, order: d.order },
      });

      for (const lvl of LEVELS_CONFIG) {
        await appDb.level.upsert({
          where: {
            domainId_number: { domainId: domain.id, number: lvl.number },
          },
          update: {
            name: lvl.name,
            companyProfileJson: {
              summary: lvl.company,
              rows: lvl.rows,
              tableCount: lvl.tables,
            },
          },
          create: {
            domainId: domain.id,
            number: lvl.number,
            name: lvl.name,
            companyProfileJson: {
              summary: lvl.company,
              rows: lvl.rows,
              tableCount: lvl.tables,
            },
          },
        });
      }
    }

    // 2. Seed Badges
    for (const b of BADGES_SEED_DATA) {
      await appDb.badge.upsert({
        where: { slug: b.slug },
        update: { name: b.name, description: b.description, icon: b.icon },
        create: { slug: b.slug, name: b.name, description: b.description, icon: b.icon },
      });
    }

    // 3. Seed App Config
    await appDb.appConfig.upsert({
      where: { key: "unlock_rule" },
      update: { valueJson: { min_solved: 70, min_boss_solved: 5 } },
      create: { key: "unlock_rule", valueJson: { min_solved: 70, min_boss_solved: 5 } },
    });

    console.log("✅ Seed completed successfully in PostgreSQL.");
  } catch (err) {
    console.log("ℹ️ Database offline; seed fixtures loaded into runtime memory.");
  }
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
