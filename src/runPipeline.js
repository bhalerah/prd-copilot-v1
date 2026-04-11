import { analyzeInput } from "./analyzer.js";
import { draftPrd } from "./drafter.js";
import { reviewPrd } from "./reviewer.js";
import { finalizePrd } from "./finalizer.js";
import { toMarkdown } from "./format.js";

export async function runPipeline({
  featureIdea,
  targetUser,
  businessProblem = "",
  constraints = "",
}) {
  const combinedInput = `
Feature idea: ${featureIdea}
Target user: ${targetUser}
Business problem: ${businessProblem}
Constraints: ${constraints}
`;

  console.time("analysis");
  const analysis = await analyzeInput(combinedInput);
  console.timeEnd("analysis");

  console.time("draft");
  const draft = await draftPrd(analysis);
  console.timeEnd("draft");

  console.time("review");
  const review = await reviewPrd(draft);
  console.timeEnd("review");

const qualityScore = review?.quality_score ?? 0;
const gapCount = review?.gaps?.length ?? 0;

console.log("Review summary:", {
  quality_score: qualityScore,
  gaps: gapCount,
    improvements: review?.improvements?.length ?? 0,
});
console.log("quality_score:", qualityScore);
console.log("gap_count:", gapCount);

const shouldSkipFinalize = qualityScore >= 7 && gapCount <= 2;

let finalPrd;

if (shouldSkipFinalize) {
  console.log("Skipping finalize: draft quality is already strong.");

  finalPrd = {
    ...draft,
    risk_mitigations: draft.risk_mitigations || [],
    operational_constraints: draft.operational_constraints || [],
    metric_definitions: draft.metric_definitions || [],
    prioritization_rationale: draft.prioritization_rationale || [],
  };
} else {
  console.time("finalize");
  const finalizedPatch = await finalizePrd(draft, review);
  console.timeEnd("finalize");

  const defaultRiskMitigations = [
    "Add training, monitoring, and compliance review controls before launch."
  ];

  finalPrd = {
    ...draft,
    ...finalizedPatch,
    workflow: finalizedPatch?.workflow ?? draft.workflow,
    user_stories: finalizedPatch?.user_stories ?? draft.user_stories,
    success_metrics: finalizedPatch?.success_metrics ?? draft.success_metrics,
    rollout_plan: finalizedPatch?.rollout_plan ?? draft.rollout_plan,
    risk_mitigations:
      finalizedPatch?.risk_mitigations?.length
        ? finalizedPatch.risk_mitigations
        : draft?.risk_mitigations?.length
          ? draft.risk_mitigations
          : defaultRiskMitigations,
    operational_constraints:
      finalizedPatch?.operational_constraints ?? draft.operational_constraints ?? [],
    metric_definitions:
      finalizedPatch?.metric_definitions ?? draft.metric_definitions ?? [],
    prioritization_rationale:
      finalizedPatch?.prioritization_rationale ?? draft.prioritization_rationale ?? [],
    open_questions: finalizedPatch?.open_questions ?? draft.open_questions,
    goals: finalizedPatch?.goals ?? draft.goals,
    risks: finalizedPatch?.risks ?? draft.risks,
    tradeoffs: finalizedPatch?.tradeoffs ?? draft.tradeoffs,
    problem_statement: finalizedPatch?.problem_statement ?? draft.problem_statement,
  };
}
  console.time("markdown");
  const markdown = toMarkdown(finalPrd, review);
  console.timeEnd("markdown");

  return {
    analysis,
    draft,
    review,
    finalPrd,
    markdown,
  };
}