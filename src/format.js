function formatValue(value) {
  if (value === null || value === undefined) {
    return "N/A";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(formatValue).join(", ");
  }

  if (typeof value === "object") {
    if (value.story) return value.story;
    if (value.name) return value.name;
    if (value.title) return value.title;

    if (value.goal) {
      return `${value.goal} (Metric: ${value.metric || "N/A"}, Baseline: ${value.baseline || "N/A"}, Target: ${value.target || "N/A"}, Timeframe: ${value.timeframe || "N/A"})`;
    }

    if (value.step) {
      const parts = [
        `${value.step}`,
        value.action ? `Action: ${value.action}` : null,
        value.output ? `Output: ${value.output}` : null,
        value.user_interaction ? `User interaction: ${value.user_interaction}` : null,
      ].filter(Boolean);

      return parts.join("\n");
    }

    if (value.metric_name && value.definition) {
      return `${value.metric_name}: ${value.definition}`;
    }

    if (value.metric_name) {
      const parts = [
        value.metric_name,
        value.how_measured ? `How measured: ${value.how_measured}` : null,
        value.baseline ? `Baseline: ${value.baseline}` : null,
        value.target ? `Target: ${value.target}` : null,
        value.timeframe ? `Timeframe: ${value.timeframe}` : null,
      ].filter(Boolean);

      return parts.join("\n");
    }

    if (value.phase) {
      const parts = [
        value.phase,
        value.duration ? `Duration: ${value.duration}` : null,
        value.description ? value.description : null,
        value.success_criteria ? `Success criteria: ${value.success_criteria}` : null,
      ].filter(Boolean);

      return parts.join("\n");
    }

    if (value.measurement_method) {
      return `${value.metric_name || "Metric"} measured by ${value.measurement_method}`;
    }
if (value.issue && value.recommendation) {
  return `${value.issue} → ${value.recommendation}`;
}
    return JSON.stringify(value);
  }

  return String(value);
}

function formatList(items = [], prefix = "- ") {
  if (!items || items.length === 0) {
    return `${prefix}None`;
  }

  return items.map((item) => `${prefix}${formatValue(item)}`).join("\n");
}

function getStatus(score) {
  if (score >= 8) return "Ready for stakeholders";
  if (score >= 6) return "Minor review needed";
  return "Review recommended";
}

export function toMarkdown(finalPrd, review) {
  const stories = (finalPrd.user_stories || [])
    .map((item, index) => {
      const criteria = formatList(item.acceptance_criteria || [], "  - ");

      return `### User Story ${index + 1}
${formatValue(item.story)}

Acceptance Criteria:
${criteria}`;
    })
    .join("\n\n");

  const section = (title, items = []) => {
    return `## ${title}
${formatList(items)}`;
  };

  return `# ${formatValue(finalPrd.title)}

**PRD Status:** ${getStatus(review?.quality_score)}  
**Quality Score:** ${formatValue(review?.quality_score)}  
**Gap Count:** ${(review?.gaps || []).length}

---

## Problem Statement
${formatValue(finalPrd.problem_statement)}

${section("Goals", finalPrd.goals)}

${section("Non-Goals", finalPrd.non_goals)}

${section("Target Users", finalPrd.target_users)}

${section("Assumptions", finalPrd.assumptions)}

${section("Workflow", finalPrd.workflow)}

## User Stories
${stories || "No user stories provided."}

${section("Risks", finalPrd.risks)}

${section("Risk Mitigations", finalPrd.risk_mitigations)}

${section("Dependencies", finalPrd.dependencies)}

${section("Operational Constraints", finalPrd.operational_constraints)}

${section("Rollout Plan", finalPrd.rollout_plan)}

${section("Success Metrics", finalPrd.success_metrics)}

${section("Metric Definitions", finalPrd.metric_definitions)}

${section("Open Questions", finalPrd.open_questions)}

${section("Tradeoffs", finalPrd.tradeoffs)}

${section("Prioritization Rationale", finalPrd.prioritization_rationale)}

## Reviewer Summary
- Quality Score: ${formatValue(review?.quality_score)}
${(review?.strengths || []).map((x) => `- Strength: ${formatValue(x)}`).join("\n")}
${(review?.gaps || []).map((x) => `- Gap: ${formatValue(x)}`).join("\n")}
${(review?.improvements || []).map((x) => `- Improvement: ${formatValue(x)}`).join("\n")}
`;
}