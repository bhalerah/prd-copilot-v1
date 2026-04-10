export function buildAnalyzePrompt(input) {
  return `
You are a senior product strategist.

Analyze the following feature/request and convert it into a clean product brief.

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
You are a strong product manager writing a clear PRD.

Use this analyzed input:
${JSON.stringify(analysis, null, 2)}

Create a concise but high-quality PRD.

Return valid JSON only in this exact shape:
{
  "title": "",
  "problem_statement": "",
  "goals": [],
  "non_goals": [],
  "target_users": [],
  "user_stories": [
    {
      "story": "",
      "acceptance_criteria": []
    }
  ],
  "risks": [],
  "dependencies": [],
  "success_metrics": [],
  "open_questions": []
}
`;
}

export function buildReviewPrompt(prd) {
  return `
You are a product leadership reviewer.

Review this PRD for completeness, ambiguity, weak metrics, missing risks, and unclear acceptance criteria.

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

Return valid JSON only in this exact shape:
{
  "title": "",
  "problem_statement": "",
  "goals": [],
  "non_goals": [],
  "target_users": [],
  "user_stories": [
    {
      "story": "",
      "acceptance_criteria": []
    }
  ],
  "risks": [],
  "dependencies": [],
  "success_metrics": [],
  "open_questions": []
}
`;
}