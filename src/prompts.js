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
You are a senior product director.

Write a strong first-draft PRD from the structured input below.

Structured input:
${JSON.stringify(analysis)}

Instructions:
- Be specific and practical
- Avoid generic language
- Make reasonable assumptions where details are missing
- Keep the document concise but useful
- Focus on clarity for product, engineering, design, and operations stakeholders
- Avoid placeholder entries such as "Phase 1", "Phase 2", "Phase 3" without meaningful detail

Include:
1. title
2. problem statement
3. goals
4. non-goals
5. target users
6. assumptions
7. workflow
8. user stories with acceptance criteria
9. risks
10. dependencies
11. success metrics
12. open questions
13. tradeoffs
14. rollout plan

For workflow, every item must include:
- step
- action
- output
- user_interaction

For success_metrics, every metric must include:
- metric_name
- how_measured
- baseline
- target
- timeframe

For rollout_plan, every phase must include:
- phase
- duration
- description
- success_criteria

Return valid JSON only in this exact shape:
{
  "title": "",
  "problem_statement": "",
  "goals": [],
  "non_goals": [],
  "target_users": [],
  "assumptions": [],
  "workflow": [
    {
      "step": "",
      "action": "",
      "output": "",
      "user_interaction": ""
    }
  ],
  "user_stories": [
    {
      "story": "",
      "acceptance_criteria": []
    }
  ],
  "risks": [],
  "dependencies": [],
  "success_metrics": [
    {
      "metric_name": "",
      "how_measured": "",
      "baseline": "",
      "target": "",
      "timeframe": ""
    }
  ],
  "open_questions": [],
  "tradeoffs": [],
  "rollout_plan": [
    {
      "phase": "",
      "duration": "",
      "description": "",
      "success_criteria": ""
    }
  ]
}
`;
}

export function buildReviewPrompt(prd) {
  return `
You are a pragmatic product lead doing a lightweight quality review of a draft PRD.

Score the draft fairly as a first draft, not as a final executive-ready document.

Focus only on the most important issues:
- unclear problem or scope
- weak or missing metrics
- vague acceptance criteria
- missing rollout clarity

Be concise.
List at most 3 gaps.
List at most 3 improvements.

Scoring guidance:
- 8-10 = strong draft, only minor refinements needed
- 5-7 = usable draft, but needs meaningful improvement
- 0-4 = weak draft with major gaps

For each improvement, return:
- issue
- recommendation

PRD:
${JSON.stringify(prd)}

Return JSON:
{
  "quality_score": 0,
  "gaps": [],
  "improvements": [
    {
      "issue": "",
      "recommendation": ""
    }
  ]
}
`;
}

export function buildFinalizePrompt(prd, review) {
  return `
You are an expert product requirements editor.

Your task is to improve only the weak or incomplete parts of this PRD using the review feedback.

Draft PRD:
${JSON.stringify(prd)}

Review feedback:
${JSON.stringify(review)}

Instructions:
- Preserve strong sections exactly as they are
- Only return sections that need improvement
- Do not rewrite the full PRD
- If a section is already strong, omit it from the output
- Focus especially on weak or incomplete rollout, metrics, workflow, risk mitigations, operational constraints, and prioritization rationale
- Keep improvements concise and executive-readable
- Avoid placeholder entries such as "Phase 1", "Phase 2", "Phase 3" without meaningful detail
- If risks are present, you must return at least one concrete risk_mitigation entry.
- Do not leave risk_mitigations empty when risks are listed.

If you improve workflow, each item must include:
- step
- action
- output
- user_interaction

If you improve success_metrics, each metric must include:
- metric_name
- how_measured
- baseline
- target
- timeframe

If you improve rollout_plan, each phase must include:
- phase
- duration
- description
- success_criteria

Return valid JSON only.
Return only the sections that need improvement, in this shape:
{
  "problem_statement": "",
  "goals": [],
  "workflow": [
    {
      "step": "",
      "action": "",
      "output": "",
      "user_interaction": ""
    }
  ],
  "user_stories": [
    {
      "story": "",
      "acceptance_criteria": []
    }
  ],
  "risks": [],
  "success_metrics": [
    {
      "metric_name": "",
      "how_measured": "",
      "baseline": "",
      "target": "",
      "timeframe": ""
    }
  ],
  "tradeoffs": [],
  "risk_mitigations": [],
  "rollout_plan": [
    {
      "phase": "",
      "duration": "",
      "description": "",
      "success_criteria": ""
    }
  ],
  "operational_constraints": [],
  "metric_definitions": [],
  "prioritization_rationale": [],
  "open_questions": []
}
`;
}