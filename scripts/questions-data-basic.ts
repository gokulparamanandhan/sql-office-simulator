import { InterviewQuestion } from "../src/lib/content/interview-questions";
import { getBasicStages1To3 } from "./basic-stages/stages-1-to-3";
import { getBasicStages4To5 } from "./basic-stages/stages-4-to-5";
import { getBasicStage6Cte } from "./basic-stages/stage-6-cte";
import { getBasicStage7WindowBasics } from "./basic-stages/stage-7-window-basics";
import { getBasicStage8Ranking } from "./basic-stages/stage-8-ranking";
import { getBasicStage9Navigation } from "./basic-stages/stage-9-navigation";
import { getBasicStage10Frames } from "./basic-stages/stage-10-frames";

// Level 1: Basic (100 Progressive Foundations-to-Analytical Questions)
export function getBasicQuestions(): InterviewQuestion[] {
  const all: InterviewQuestion[] = [
    ...getBasicStages1To3(),
    ...getBasicStages4To5(),
    ...getBasicStage6Cte(),
    ...getBasicStage7WindowBasics(),
    ...getBasicStage8Ranking(),
    ...getBasicStage9Navigation(),
    ...getBasicStage10Frames(),
  ];

  if (all.length !== 100) {
    throw new Error(`Expected 100 Basic questions, found ${all.length}`);
  }

  return all.map((q, idx) => {
    const num = idx + 1;
    return {
      ...q,
      id: `basic-${String(num).padStart(3, "0")}`,
      number: num,
    };
  });
}
