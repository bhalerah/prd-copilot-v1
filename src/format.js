export function toMarkdown(finalPrd, review) {
  const stories = finalPrd.user_stories
    .map((item, index) => {
      const criteria = item.acceptance_criteria
        .map((c) => `  - ${c}`)
        .join("\n");

      return `### User Story ${index + 1}
${item.story}

Acceptance Criteria:
${criteria}`;
    })
    .join("\n\n");

  const section = (title, items = []) =>
    `## ${title}\n${items.map((x) => `- ${x}`).join("\n")}`;

  return `# ${finalPrd.title}

## Problem Statement
${finalPrd.problem_statement}

${section("Goals", finalPrd.goals)}

${section("Non-Goals", finalPrd.non_goals)}

${section("Target Users", finalPrd.target_users)}

## User Stories
${stories}

${section("Risks", finalPrd.risks)}

${section("Dependencies", finalPrd.dependencies)}

${section("Success Metrics", finalPrd.success_metrics)}

${section("Open Questions", finalPrd.open_questions)}

## Reviewer Summary
- Quality Score: ${review.quality_score}
${review.strengths.map((x) => `- Strength: ${x}`).join("\n")}
${review.gaps.map((x) => `- Gap: ${x}`).join("\n")}
${review.improvements.map((x) => `- Improvement: ${x}`).join("\n")}
`;
}