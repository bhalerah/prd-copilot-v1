export function buildAnalyzePrompt(input) {
  return `
You are a senior product strategist.

Analyze the following feature request and convert it into a clean product brief.

User input:
${input}

Return valid JSON only in this exact shape:
{
  "feature_name": "",
  "target_user": "",
  "problem_statement": "",
  "business_goal": "",
  "constraints": [],
  "assumptions": [],
  "open_questions": []
}
`;
}

export function buildDraftPrompt(analysis) {
  return `
You are a senior product director at a top technology company.

Your task is to write a high-quality Product Requirements Document (PRD) from the structured input below.

Structured input:
${JSON.stringify(analysis, null, 2)}

Instructions:
- Avoid generic language
- Use specific, measurable product language
- Make reasonable assumptions where details are missing, and state them clearly
- Think in terms of systems, workflows, tradeoffs, rollout, and operational realism
- Write like an experienced product leader preparing a document for engineering, design, and business stakeholders

You MUST include:
1. A clear problem statement with concrete impact
2. Measurable goals with numbers or percentages where possible
3. Non-goals to define scope boundaries
4. Target users
5. Assumptions
6. End-to-end workflow (input → processing → output → user action)
7. User stories with strong acceptance criteria
8. Risks
9. Dependencies
10. Success metrics
11. Open questions
12. Tradeoffs
13. Risk mitigation strategies
14. Rollout strategy
15. Operational constraints
16. Measurement definitions for every metric
17. Prioritization rationale

For every success metric, define exactly:
- metric name
- how it is measured
- baseline
- target
- timeframe

Return valid JSON only in this exact shape:
{
  "title": "",
  "problem_statement": "",
  "goals": [],
  "non_goals": [],
  "target_users": [],
  "assumptions": [],
  "workflow": [],
  "user_stories": [
    {
      "story": "",
      "acceptance_criteria": []
    }
  ],
  "risks": [],
  "dependencies": [],
  "success_metrics": [],
  "open_questions": [],
  "tradeoffs": [],
  "risk_mitigations": [],
  "rollout_plan": [],
  "operational_constraints": [],
  "metric_definitions": [],
  "prioritization_rationale": []
}
`;
}

export function buildReviewPrompt(prd) {
  return `
You are a product director reviewing a PRD for leadership readiness.

Critique this PRD specifically for:
- ambiguity in scope
- weak or undefined metrics
- missing rollout or adoption planning
- unaddressed operational risks
- lack of prioritization logic
- insufficient mitigation planning
- weak workflow clarity
- vague acceptance criteria

Be direct and concrete. Do not be polite. Focus on the most important gaps.

PRD:
${JSON.stringify(prd, null, 2)}

Return valid JSON only in this exact shape:
{
  "quality_score": 0,
  "strengths": [],
  "gaps": [],
  "improvements": []
}
`;
}

export function buildFinalizePrompt(prd, review) {
  return `
You are an expert product requirements editor.

Improve the PRD using the review feedback below.

Original PRD:
${JSON.stringify(prd, null, 2)}

Review feedback:
${JSON.stringify(review, null, 2)}

You must resolve the reviewer’s major gaps in the final PRD.
Do not preserve vague objects when a human-readable statement can be produced.
For goals, workflow, rollout, and metric definitions, write executive-readable entries instead of raw JSON-style structures.
Strengthen metrics with clear definitions and measurement methods.
Ensure rollout includes phases, success criteria, and adoption signals.
Ensure acceptance criteria are testable and specific.

Return valid JSON only in this exact shape:
{
  "title": "",
  "problem_statement": "",
  "goals": [],
  "non_goals": [],
  "target_users": [],
  "assumptions": [],
  "workflow": [],
  "user_stories": [
    {
      "story": "",
      "acceptance_criteria": []
    }
  ],
  "risks": [],
  "dependencies": [],
  "success_metrics": [],
  "open_questions": [],
  "tradeoffs": [],
  "risk_mitigations": [],
  "rollout_plan": [],
  "operational_constraints": [],
  "metric_definitions": [],
  "prioritization_rationale": []
}
`;
}