export interface QuestionBlueprintSlot {
  order: number;
  difficulty: "warm-up" | "core" | "challenging" | "boss";
  xp: number;
  estimatedMinutes: number;
  stakeholder: {
    name: string;
    role: string;
  };
  targetConcepts: string[];
  departmentTheme:
    | "Executive"
    | "Sales"
    | "Inventory"
    | "Finance"
    | "Customer Success"
    | "Merchandising"
    | "Operations";
}

const STAKEHOLDERS = [
  { name: "Alex Rivera", role: "CEO", theme: "Executive" as const },
  { name: "Sarah Lin", role: "Head of Sales", theme: "Sales" as const },
  { name: "Marcus Vance", role: "Inventory Lead", theme: "Inventory" as const },
  { name: "Elena Rostova", role: "Director of Finance", theme: "Finance" as const },
  { name: "David Kim", role: "Customer Success Lead", theme: "Customer Success" as const },
  { name: "Rachel Green", role: "Merchandising Manager", theme: "Merchandising" as const },
  { name: "Carlos Mendez", role: "Operations Supervisor", theme: "Operations" as const },
];

export function generateLevel1Blueprint(): QuestionBlueprintSlot[] {
  const slots: QuestionBlueprintSlot[] = [];

  for (let order = 1; order <= 100; order++) {
    const stakeholder = STAKEHOLDERS[(order - 1) % STAKEHOLDERS.length];

    if (order <= 30) {
      // Q1–30: Warm-up (10 XP)
      let concepts = ["SELECT", "WHERE"];
      if (order % 5 === 1) concepts.push("ORDER BY", "LIMIT");
      else if (order % 5 === 2) concepts.push("COUNT", "DISTINCT");
      else if (order % 5 === 3) concepts.push("BETWEEN", "WHERE");
      else if (order % 5 === 4) concepts.push("LIKE", "WHERE");
      else concepts.push("MIN", "MAX", "AVG");

      slots.push({
        order,
        difficulty: "warm-up",
        xp: 10,
        estimatedMinutes: 4,
        stakeholder: { name: stakeholder.name, role: stakeholder.role },
        targetConcepts: concepts,
        departmentTheme: stakeholder.theme,
      });
    } else if (order <= 70) {
      // Q31–70: Core (20 XP)
      let concepts = ["SELECT", "GROUP BY"];
      if (order % 4 === 1) concepts.push("INNER JOIN", "COUNT");
      else if (order % 4 === 2) concepts.push("LEFT JOIN", "NULL HANDLING");
      else if (order % 4 === 3) concepts.push("HAVING", "SUM");
      else concepts.push("INNER JOIN", "AVG", "ROUND");

      slots.push({
        order,
        difficulty: "core",
        xp: 20,
        estimatedMinutes: 7,
        stakeholder: { name: stakeholder.name, role: stakeholder.role },
        targetConcepts: concepts,
        departmentTheme: stakeholder.theme,
      });
    } else if (order <= 90) {
      // Q71–90: Challenging (35 XP)
      const concepts = [
        "INNER JOIN",
        "LEFT JOIN",
        "GROUP BY",
        "HAVING",
        "ORDER BY",
        "LIMIT",
      ];
      slots.push({
        order,
        difficulty: "challenging",
        xp: 35,
        estimatedMinutes: 10,
        stakeholder: { name: stakeholder.name, role: stakeholder.role },
        targetConcepts: concepts,
        departmentTheme: stakeholder.theme,
      });
    } else {
      // Q91–100: Boss Questions (60 XP)
      const concepts = [
        "MULTI-TABLE JOIN",
        "GROUP BY",
        "STATUS FILTER",
        "DATE FILTER",
        "ORDER BY",
        "ROUND",
      ];
      slots.push({
        order,
        difficulty: "boss",
        xp: 60,
        estimatedMinutes: 15,
        stakeholder: { name: stakeholder.name, role: stakeholder.role },
        targetConcepts: concepts,
        departmentTheme: stakeholder.theme,
      });
    }
  }

  return slots;
}
